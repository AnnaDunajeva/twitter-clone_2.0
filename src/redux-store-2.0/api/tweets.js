import { pick, mapValues } from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { 
    LOADED, 
    URL,
    NOT_FOUND,
    ERROR } from "../constants"

import { tweetsFetchSuccess, tweetsFetchError, tweetDelete } from '../entities/tweets/actions'
import { tweetToggleLike } from '../entities/tweets/entities/actions'
import { usersFetchSuccess } from '../entities/users/actions'
import { globalErrorAdd, globalErrorRemove } from '../errors/actions'
import { 
        COMPOSITE_DATA_ENTITIES_FETCH_ERROR,
        COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR,
        TWEET_TOGGLE_LIKE,
        TWEET_POST,
        TWEET_DELETE } from '../action-types'
import { 
    compositeDataEntitiesFetch, 
    compositeDataEntitiesFetchSuccess,
    compositeDataEntitiesFetchError,
    compositeDataEntitiesUpdateFetchSuccess,
    newTweetAddToFeed,
    newTweetAddToReplies,
    newTweetAddToUserReplies,
    newTweetAddToUserTweets,
    newTweetAddToUserImages, 
    newLikeAddToUserLikes,
    newLikeRemoveFromUserLikes } from '../composite-data/actions'
import { 
    conversationKey,
    homeKey,
    userTweetsKey,
    userTweetImagesKey,
    userTweetLikesKey,
    tweetLikesKey,
    userRepliesKey } from '../utils/compositeDataStateKeys'
import {getAuthedUserId} from '../../redux-store-2.0/session/selectors'

export function getFeedPaginated(data) {
    return async (dispatch) => {
        if (data.update) {
            dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${homeKey()}`))
        } else {
            dispatch(showLoading())
            dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${homeKey()}`))
            dispatch(compositeDataEntitiesFetch(homeKey()))
        }

        try{
            const feedResponse = await fetch(`${URL}/user/feed?take=${data.take}&skip=${data.skip}&time=${data.time}&getUsers=true&getParents=false&update=${data.update ? true : false}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            
            const feedData = await feedResponse.json()

            if (feedData.error) {
                if (data.update) {
                    dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${homeKey()}`, feedData.error))
                } else {
                    dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${homeKey()}`, feedData.error))
                    dispatch(compositeDataEntitiesFetchError(homeKey(), feedData.error, data.time))
                }
            } else {
                const feed = Object.keys(feedData.tweets).map(tweetId => pick(feedData.tweets[tweetId], ['id', 'sortindex'])).sort((a,b) => b.sortindex - a.sortindex)
               
                const tweetsFetchStatus = mapValues(feedData.tweets, () => LOADED)
                const usersFetchStatus = mapValues(feedData.users, () => LOADED)
    
                dispatch(tweetsFetchSuccess(feedData.tweets, tweetsFetchStatus))
                dispatch(usersFetchSuccess(feedData.users, usersFetchStatus))
                if (data.update) {
                    dispatch(compositeDataEntitiesUpdateFetchSuccess(homeKey(), feed))
                } else {
                    dispatch(compositeDataEntitiesFetchSuccess(homeKey(), feed, data.time)) //it is important that composite data goes last
                    //because on its status depends rendering so if it goes first but tweets are not jet loaded, then there will be problems 
                    //with stuff being undefined
                }
            }
            if (!data.update) dispatch(hideLoading())
        }
        catch(err) {
            console.log(err.message)
            if (data.update) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${homeKey()}`, err.message))
                dispatch(compositeDataEntitiesFetchError(homeKey(), err.message, data.time))
                dispatch(hideLoading())
            } else {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${homeKey()}`, err.message))
            }
        }
    }
}

export function getConversationPaginated (data) {
    return async (dispatch) => {
        dispatch(showLoading())
        const stateKey = conversationKey(data.tweetId)
        dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`))
        dispatch(compositeDataEntitiesFetch(stateKey))

        try {
            console.log('inside action getRepliesPaginated ', data)
            const response = await fetch(`${URL}/user/tweets/${data.tweetId}/conversation?take=${data.take}&skip=${data.skip}&time=${data.time}&getUsers=true&getMainTweet=${data.getMainTweet}`, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await response.json() //{tweets: {someId: {...}}}

            if (responseData.error) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, responseData.error))
                dispatch(compositeDataEntitiesFetchError(stateKey, responseData.error, data.time))
            } else {
                const tweets = responseData.tweets //always contains parents tweet so need to think whether i should filter it from tweetsFetchSuccess
                const users = responseData.users

                const tweetsFetchStatus = mapValues(tweets, () => LOADED)
                const usersFetchStatus = mapValues(users, () => LOADED)
                
                if (data.getMainTweet && tweets[data.tweetId] === undefined) {
                    dispatch(tweetsFetchError({[data.tweetId]: NOT_FOUND}, {[data.tweetId]:ERROR}))
                    dispatch(compositeDataEntitiesFetchError(stateKey, NOT_FOUND, data.time))
                } else {
                    const conversation = Object.keys(tweets).filter(tweetId => data.skip !== 0 ? data.tweetId !== tweetId : true).map(tweetId => pick(tweets[tweetId], ['id', 'sortindex', 'type'])).sort((a,b) => b.sortindex - a.sortindex)
        
                    dispatch(usersFetchSuccess(users, usersFetchStatus))
                    dispatch(tweetsFetchSuccess(tweets, tweetsFetchStatus))
                    dispatch(compositeDataEntitiesFetchSuccess(stateKey, conversation, data.time))
                }
            }
            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)

            dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, err.message))
            dispatch(compositeDataEntitiesFetchError(stateKey, err.message, data.time))
            dispatch(hideLoading())
        }
    }
}

export function getConversationUpdate (data) {
    return async (dispatch) => {
        dispatch(showLoading())
        const stateKey = conversationKey(data.tweetId)
        dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`))

        try {
            const response = await fetch(`${URL}/user/tweets/${data.tweetId}/conversation/update?take=${data.take}&time=${data.time}&getUsers=true`, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await response.json() //{tweets: {someId: {...}}}

            if (responseData.error) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`, responseData.error))
            } else {
                const tweets = responseData.tweets //always contains parents tweet so need to think whether i should filter it from tweetsFetchSuccess
                const users = responseData.users

                const tweetsFetchStatus = mapValues(tweets, () => LOADED)
                const usersFetchStatus = mapValues(users, () => LOADED)
                
                const conversationUpdate = Object.keys(tweets).filter(tweetId => data.skip !== 0 ? data.tweetId !== tweetId : true).map(tweetId => pick(tweets[tweetId], ['id', 'sortindex', 'type'])).sort((a,b) => b.sortindex - a.sortindex)

                if (conversationUpdate.length > 0) {
        
                    dispatch(usersFetchSuccess(users, usersFetchStatus))
                    dispatch(tweetsFetchSuccess(tweets, tweetsFetchStatus))
                    dispatch(compositeDataEntitiesUpdateFetchSuccess(stateKey, conversationUpdate))
                }
            }
            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)

            dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`, err.message))
            dispatch(hideLoading())
        }
    }
}

export function getUserTweetsPaginated (data) {
    return async (dispatch) => {
        const stateKey = userTweetsKey(data.userId)
        if (data.update) {
            dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`))
        } else {
            dispatch(showLoading(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`))
            dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`))
            dispatch(compositeDataEntitiesFetch(stateKey))
        }

        try {
            const tweetsResponse = await fetch(`${URL}/users/${data.userId}/tweets?take=${data.take}&skip=${data.skip}&time=${data.time}&getUsers=false&getParents=false&update=${data.update ? true : false}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const tweetsData = await tweetsResponse.json()
            if (tweetsData.error) {
                if (data.update) {
                    dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`, tweetsData.error))
                } else {
                    dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, tweetsData.error))
                    dispatch(compositeDataEntitiesFetchError(stateKey, tweetsData.error, data.time))
                }
            } else {
                const tweets = tweetsData.tweets
    
                const userTweets = Object.keys(tweets).map(tweetId => pick(tweets[tweetId], ['id', 'sortindex'])).sort((a,b) => b.sortindex - a.sortindex)
               
                const tweetsFetchStatus = mapValues(tweets, () => LOADED)
    
                dispatch(tweetsFetchSuccess(tweets, tweetsFetchStatus))
                if (data.update) {
                    dispatch(compositeDataEntitiesUpdateFetchSuccess(stateKey, userTweets)) //it is important that composite data goes last
                } else {
                    dispatch(compositeDataEntitiesFetchSuccess(stateKey, userTweets, data.time))

                }
            }
            if (!data.update) dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)
            if (data.update) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`, err.message))
            } else {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, err.message))
                dispatch(compositeDataEntitiesFetchError(stateKey, err.message, data.time))
                dispatch(hideLoading())
            }
        }
    }
}

export function getUserTweetImagesPaginated (data) {
    return async (dispatch) => {
        const stateKey = userTweetImagesKey(data.userId)
        if (data.update) {
            dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`))
        } else {
            dispatch(showLoading())
            dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`))
            dispatch(compositeDataEntitiesFetch(stateKey))
        }

        try {
            const tweetsResponse = await fetch(`${URL}/users/${data.userId}/tweets/media?take=${data.take}&skip=${data.skip}&time=${data.time}&getUsers=false&getParents=false&update=${data.update ? true : false}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const tweetsData = await tweetsResponse.json()
            if (tweetsData.error) {
                if (data.update) {
                    dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`, tweetsData.error))
                } else {
                    dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, tweetsData.error))
                    dispatch(compositeDataEntitiesFetchError(stateKey, tweetsData.error, data.time))
                }
            } else {
                const tweets = tweetsData.tweets
    
                const userTweets = Object.keys(tweets).map(tweetId => pick(tweets[tweetId], ['id', 'sortindex'])).sort((a,b) => b.sortindex - a.sortindex)
               
                const tweetsFetchStatus = mapValues(tweets, () => LOADED)
    
                dispatch(tweetsFetchSuccess(tweets, tweetsFetchStatus))
                if (data.update) {
                    dispatch(compositeDataEntitiesUpdateFetchSuccess(stateKey, userTweets))
                } else {
                    dispatch(compositeDataEntitiesFetchSuccess(stateKey, userTweets, data.time))
                }  
            }
            if (!data.update) dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)
            if (data.update) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`, err.message))
            } else {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, err.message))
                dispatch(compositeDataEntitiesFetchError(stateKey, err.message, data.time))
                dispatch(hideLoading())
            }
        }
    }
}
export function getUserTweetLikesPaginated (data) {
    return async (dispatch) => {
        const stateKey = userTweetLikesKey(data.userId)
        if (data.update) {
            dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`))
        } else {
            dispatch(showLoading())
            dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`))
            dispatch(compositeDataEntitiesFetch(stateKey))
        }

        try {
            const tweetsResponse = await fetch(`${URL}/users/${data.userId}/tweets/likes?take=${data.take}&skip=${data.skip}&time=${data.time}&getUsers=true&update=${data.update ? true : false}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const tweetsData = await tweetsResponse.json()

            if (tweetsData.error) {
                if (data.update) {
                    dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`, tweetsData.error))
                } else {
                    dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, tweetsData.error))
                    dispatch(compositeDataEntitiesFetchError(stateKey, tweetsData.error, data.time))
                }
            } else {
                const tweets = tweetsData.tweets
                const users = tweetsData.users
    
                const userTweets = Object.keys(tweets).map(tweetId => pick(tweets[tweetId], ['id', 'sortindex'])).sort((a,b) => b.sortindex - a.sortindex)
               
                const tweetsFetchStatus = mapValues(tweets, () => LOADED)
                const usersFetchStatus = mapValues(users, () => LOADED)
                
                dispatch(usersFetchSuccess(users, usersFetchStatus))
                dispatch(tweetsFetchSuccess(tweets, tweetsFetchStatus))
                if (data.update) {
                    dispatch(compositeDataEntitiesUpdateFetchSuccess(stateKey, userTweets))
                } else {
                    dispatch(compositeDataEntitiesFetchSuccess(stateKey, userTweets, data.time))
                }
            }
            if (!data.update) dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)
            if (data.update) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`, err.message))
            } else {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, err.message))
                dispatch(compositeDataEntitiesFetchError(stateKey, err.message, data.time))
                dispatch(hideLoading())
            }
        }
    }
}

export function getUserRepliesPaginated (data) {
    return async (dispatch) => {
        const stateKey = userRepliesKey(data.userId)
        if (data.update) {
            dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`))
        } else {
            dispatch(showLoading())
            dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`))
            dispatch(compositeDataEntitiesFetch(stateKey))
        }

        try {
            const tweetsResponse = await fetch(`${URL}/users/${data.userId}/tweets/replies?take=${data.take}&skip=${data.skip}&time=${data.time}&getUsers=false&update=${data.update ? true : false}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const tweetsData = await tweetsResponse.json()
            if (tweetsData.error) {
                if (data.update) {
                    dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`, tweetsData.error))
                } else {
                    dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, tweetsData.error))
                    dispatch(compositeDataEntitiesFetchError(stateKey, tweetsData.error, data.time))
                }
            } else {
                const tweets = tweetsData.tweets
    
                const userTweets = Object.keys(tweets).map(tweetId => pick(tweets[tweetId], ['id', 'sortindex'])).sort((a,b) => b.sortindex - a.sortindex)
               
                const tweetsFetchStatus = mapValues(tweets, () => LOADED)
    
                dispatch(tweetsFetchSuccess(tweets, tweetsFetchStatus))
                if (data.update) {
                    dispatch(compositeDataEntitiesUpdateFetchSuccess(stateKey, userTweets))
                } else {
                    dispatch(compositeDataEntitiesFetchSuccess(stateKey, userTweets, data.time))
                }
            }
            if (!data.update) dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)
            if (data.update) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_ERROR}/${stateKey}`, err.message))
            } else {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, err.message))
                dispatch(compositeDataEntitiesFetchError(stateKey, err.message, data.time))
                dispatch(hideLoading())
            }
        }
    }
}

export function toggleTweetsLike (data) {
    return async (dispatch, getState) => {
        const state = getState()
        const userId = getAuthedUserId()(state)
        dispatch(showLoading())
        dispatch(tweetToggleLike(data.tweetId)) //provides instant UI feedback to user
        dispatch(globalErrorRemove(`${TWEET_TOGGLE_LIKE}/${data.tweetId}`))

        try {
            const response = await fetch(`${URL}/user/tweets/like/${data.tweetId}`, {
                method: 'PUT',
                headers: {
                    'CSRF-Token': document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, "$1"),
                    'Content-Type': 'application/json',
                }
            })
            const responseData = await response.json() //{message: 'success', tweet: {...}, parents:{...}} or {error: {...}}
            if (responseData.error) {
                dispatch(tweetToggleLike(data.tweetId))
                dispatch(globalErrorAdd(`${TWEET_TOGGLE_LIKE}/${data.tweetId}`, responseData.error))
            } else {
                const tweet = responseData.tweet
                const tweetId = Object.keys(tweet)[0]

                const userTweetLikes = getState().compositeData[userTweetLikesKey(userId)]

                //a lot og troubles, should just refresh it on like... like i do with followers
                if (userTweetLikes !== undefined) {
                    const tweetShort = pick(tweet[tweetId], ['id', 'sortindex'])
                    if (tweet[tweetId].liked) {
                        dispatch(newLikeAddToUserLikes(tweetShort, userId))
                    } else {
                        dispatch(newLikeRemoveFromUserLikes(data.tweetId, userId))
                    }
                }
            }
            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)

            dispatch(tweetToggleLike(data.tweetId)) //undo user insta feedback
            dispatch(globalErrorAdd(`${TWEET_TOGGLE_LIKE}/${data.tweetId}`, err.message))
            dispatch(hideLoading())
        }
    }
}

export function postTweet (data) {
    return async (dispatch, getState) => {
        const state = getState()
        const userId = getAuthedUserId()(state)
        dispatch(showLoading())
        dispatch(globalErrorRemove(`${TWEET_POST}`))
        try {
            const formData = new FormData()
            if (data.file) {
                formData.append('file', data.file)
            }
            formData.append('tweet', JSON.stringify(data.tweet)) 

            const tweetResponse = await fetch(`${URL}/user/tweet`, {
                method: 'PUT',
                headers: {
                    'CSRF-Token': document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, "$1")
                },
                body: formData
            })
            const tweetData = await tweetResponse.json()

            if (tweetData.error) {
                dispatch(globalErrorAdd(`${TWEET_POST}`, tweetData.error))
            } else {
                const tweet = tweetData.tweet
                const tweetId = Object.keys(tweet)[0]
                const tweetFetchStatus = {[tweetId]: LOADED}
    
                const tweetShort = pick(tweet[tweetId], ['id', 'sortindex']) //does not have sortindex

                dispatch(tweetsFetchSuccess(tweet, tweetFetchStatus))
                
                const compositeData = getState().compositeData

                if (tweet[tweetId].replyingToTweetId) {
                    dispatch(newTweetAddToReplies(tweetShort, tweet[tweetId].replyingToTweetId, tweet[tweetId].user))
                    if (compositeData[userRepliesKey(tweet[tweetId].user)]) {
                        dispatch(newTweetAddToUserReplies(tweetShort, tweet[tweetId].replyingToTweetId, tweet[tweetId].user))
                    }
                } else if (compositeData[userTweetsKey(userId)]) {
                    //need this check cause there is a chance this view was not loaded yet and keyed reducer will create it then
                    //whith loaded status and wont refetch then
                    dispatch(newTweetAddToUserTweets(tweetShort, tweet[tweetId].user))
                }
                if (compositeData[homeKey()]) {
                    dispatch(newTweetAddToFeed(tweetShort))
                }
                if (tweet[tweetId].media && compositeData[userTweetImagesKey(userId)]) {
                    dispatch(newTweetAddToUserImages(tweetShort, tweet[tweetId].user))
                }
            }
            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)

            dispatch(globalErrorAdd(`${TWEET_POST}`, err.message))
            dispatch(hideLoading())
        }
    }
}


export function deleteTweet (data) {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch(globalErrorRemove(`${TWEET_DELETE}/${data.tweetId}`))

        try {
            const response = await fetch(`${URL}/user/tweet/${data.tweetId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, "$1")
                }
            })
            const responseData = await response.json() //{message: 'success', status: 'ok' or {error: {...}}
            if (responseData.error) {
                dispatch(globalErrorAdd(`${TWEET_DELETE}/${data.tweetId}`, responseData.error))
            } else {
                dispatch(tweetDelete(data.tweetId)) 
            }

            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)
            dispatch(globalErrorAdd(`${TWEET_DELETE}/${data.tweetId}`, err.message))
            dispatch(hideLoading())
        }
    }
}

export const getTweetLikesPaginated = (data) => {
    return async (dispatch) => {
        dispatch(showLoading())
    
        const tweetLikesName = tweetLikesKey(data.tweetId)
        
        dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${tweetLikesName}`))
        dispatch(compositeDataEntitiesFetch(tweetLikesName))
    
        try {
            const usersResponseData = await fetch(`${URL}/tweet/${data.tweetId}/likes?take=${data.take}&skip=${data.skip}&time=${data.time}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const usersResponse = await usersResponseData.json()
    
            if (usersResponse.error) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${tweetLikesName}`, usersResponse.error))
                dispatch(compositeDataEntitiesFetchError(tweetLikesName, usersResponse.error, data.time))
            } else {
                const users = usersResponse.users
    
                const compositeDataUsers = Object.keys(users).map(userId => pick(users[userId], ['userId', 'sortindex'])).sort((a,b) => b.sortindex - a.sortindex)
                
                const usersFetchStatus = mapValues(users, () => LOADED)
    
                dispatch(usersFetchSuccess(users, usersFetchStatus))
                dispatch(compositeDataEntitiesFetchSuccess(tweetLikesName, compositeDataUsers, data.time))
            }
    
            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)
            dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${tweetLikesName}`, err.message))
            dispatch(compositeDataEntitiesFetchError(tweetLikesName, err.message, data.time))
                        
            dispatch(hideLoading())
        }
    }
}

