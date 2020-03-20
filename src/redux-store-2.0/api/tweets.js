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
// import { getTweetById } from '../entities/tweets/entities/selectors'
import { 
        COMPOSITE_DATA_ENTITIES_FETCH_ERROR,
        TWEET_TOGGLE_LIKE,
        TWEET_POST,
        TWEET_DELETE } from '../action-types'
import { 
    compositeDataEntitiesFetch, 
    compositeDataEntitiesFetchSuccess,
    compositeDataEntitiesFetchError,
    newTweetAddToFeed,
    newTweetAddToReplies,
    newTweetAddToUserTweets,
    newTweetAddToUserImages, 
    newLikeAddToUserLikes,
    newLikeRemoveFromUserLikes,
    compositeDataClear} from '../composite-data/actions'
import { 
    conversationKey,
    homeKey,
    userTweetsKey,
    userTweetImagesKey,
    userTweetLikesKey,
    userRepliesKey } from '../utils/compositeDataStateKeys'


export function getFeedPaginated(data) {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${homeKey()}`))
        dispatch(compositeDataEntitiesFetch(homeKey()))
        try{
            console.log('inside action getFeedPaginated')
            const feedResponse = await fetch(`${URL}/user/feed?take=${data.take}&skip=${data.skip}&time=${data.time}&getUsers=true&getParents=false`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                }
            })
            
            const feedData = await feedResponse.json()
            console.log('feedData ', feedData)

            if (feedData.error) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${homeKey()}`, feedData.error))
                dispatch(compositeDataEntitiesFetchError(homeKey(), feedData.error, data.time))
            } else {
                const feed = Object.keys(feedData.tweets).map(tweetId => pick(feedData.tweets[tweetId], ['id', 'sortindex'])).sort((a,b) => b.sortindex - a.sortindex)
                console.log('feed ', feed) 
               
                const tweetsFetchStatus = mapValues(feedData.tweets, () => LOADED)
                const usersFetchStatus = mapValues(feedData.users, () => LOADED)
    
                dispatch(tweetsFetchSuccess(feedData.tweets, tweetsFetchStatus))
                dispatch(usersFetchSuccess(feedData.users, usersFetchStatus))
                dispatch(compositeDataEntitiesFetchSuccess(homeKey(), feed, data.time)) //it is important that composite data goes last
                //because on its status depends rendering so if it goes first but tweets are not jet loaded, then there will be problems 
                //with stuff being undefined

            }
            dispatch(hideLoading())
        }
        catch(err) {
            console.log(err.message)

            dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${homeKey()}`, err.message))
            dispatch(compositeDataEntitiesFetchError(homeKey(), err.message, data.time))
            dispatch(hideLoading())
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
            console.log('inside action getRepliesPaginated')
            const response = await fetch(`${URL}/user/tweets/${data.tweetId}/conversation?take=${data.take}&skip=${data.skip}&time=${data.time}&getUsers=true&getMainTweet=${data.skip === 0 ? true : false}`, { 
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                }
            })
            const responseData = await response.json() //{tweets: {someId: {...}}}
            console.log('responseData ', responseData)

            if (responseData.error) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, responseData.error))
                dispatch(compositeDataEntitiesFetchError(stateKey, responseData.error, data.time))
            } else {
                const tweets = responseData.tweets //always contains parents tweet so need to think whether i should filter it from tweetsFetchSuccess
                const users = responseData.users

                const tweetsFetchStatus = mapValues(tweets, () => LOADED)
                const usersFetchStatus = mapValues(users, () => LOADED)
                
                if (data.skip === 0 && tweets[data.tweetId] === undefined) {
                    dispatch(tweetsFetchError({[data.tweetId]: NOT_FOUND}, {[data.tweetId]:ERROR}))
                    dispatch(compositeDataEntitiesFetchError(stateKey, NOT_FOUND, data.time))
                } else {
                    const conversation = Object.keys(tweets).filter(tweetId => data.skip !== 0 ? data.tweetId !== tweetId : true).map(tweetId => pick(tweets[tweetId], ['id', 'sortindex', 'type'])).sort((a,b) => b.sortindex - a.sortindex)
                    console.log('conversation ', conversation) 
        
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

export function getUserTweetsPaginated (data) {
    return async (dispatch) => {
        dispatch(showLoading())
        const stateKey = userTweetsKey(data.userId)
        dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`))
        dispatch(compositeDataEntitiesFetch(stateKey))

        try {
            console.log('inside action handleGetUserTweetsPaginated')
            const tweetsResponse = await fetch(`${URL}/users/${data.userId}/tweets?take=${data.take}&skip=${data.skip}&time=${data.time}&getUsers=false&getParents=false`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                }
            })
            const tweetsData = await tweetsResponse.json()
            if (tweetsData.error) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, tweetsData.error))
                dispatch(compositeDataEntitiesFetchError(stateKey, tweetsData.error, data.time))
            } else {
                const tweets = tweetsData.tweets
                console.log('tweetsData ', tweetsData)
    
                const userTweets = Object.keys(tweets).map(tweetId => pick(tweets[tweetId], ['id', 'sortindex'])).sort((a,b) => b.sortindex - a.sortindex)
                console.log('userTweets ', userTweets) 
               
                const tweetsFetchStatus = mapValues(tweets, () => LOADED)
    
                dispatch(tweetsFetchSuccess(tweets, tweetsFetchStatus))
                dispatch(compositeDataEntitiesFetchSuccess(stateKey, userTweets, data.time))
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

export function getUserTweetImagesPaginated (data) {
    return async (dispatch) => {
        dispatch(showLoading())
        const stateKey = userTweetImagesKey(data.userId)
        dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`))
        dispatch(compositeDataEntitiesFetch(stateKey))

        try {
            console.log('inside action getUserTweetImagesPaginated')
            const tweetsResponse = await fetch(`${URL}/users/${data.userId}/tweets/media?take=${data.take}&skip=${data.skip}&time=${data.time}&getUsers=false&getParents=false`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                }
            })
            const tweetsData = await tweetsResponse.json()
            if (tweetsData.error) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, tweetsData.error))
                dispatch(compositeDataEntitiesFetchError(stateKey, tweetsData.error, data.time))
            } else {
                const tweets = tweetsData.tweets
                console.log('tweetsData ', tweetsData)
    
                const userTweets = Object.keys(tweets).map(tweetId => pick(tweets[tweetId], ['id', 'sortindex'])).sort((a,b) => b.sortindex - a.sortindex)
                console.log('userTweets ', userTweets) 
               
                const tweetsFetchStatus = mapValues(tweets, () => LOADED)
    
                dispatch(tweetsFetchSuccess(tweets, tweetsFetchStatus))
                dispatch(compositeDataEntitiesFetchSuccess(stateKey, userTweets, data.time))
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

export function toggleTweetsLike (data) {
    return async (dispatch, getState) => {
        dispatch(showLoading())
        dispatch(tweetToggleLike(data.tweetId)) //provides instant UI feedback to user
        dispatch(globalErrorRemove(`${TWEET_TOGGLE_LIKE}/${data.tweetId}`))

        try {
            const response = await fetch(`${URL}/user/tweets/like/${data.tweetId}`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                }
            })
            const responseData = await response.json() //{message: 'success', tweet: {...}, parents:{...}} or {error: {...}}
            if (responseData.error) {
                dispatch(tweetToggleLike(data.tweetId))
                dispatch(globalErrorAdd(`${TWEET_TOGGLE_LIKE}/${data.tweetId}`, responseData.error))
            } else {
                const tweet = responseData.tweet
                const tweetId = Object.keys(tweet)[0]

                const userTweetLikes = getState().compositeData[userTweetLikesKey(data.user.userId)]

                //a lot og troubles, should just refresh it on like... like i do with followers
                if (userTweetLikes !== undefined) {
                    const tweetShort = pick(tweet[tweetId], ['id', 'sortindex'])
                    if (tweet[tweetId].liked) {
                        dispatch(newLikeAddToUserLikes(tweetShort, data.user.userId))
                    } else {
                        // dispatch(newLikeRemoveFromUserLikes(data.tweetId, data.user.userId))
                        dispatch(compositeDataClear(userTweetLikesKey(data.user.userId)))
                    }
                }
            }

            //maybe be I dont need to update tweet like this, because what if while request was being send somebody else
            //liked tweet so when you receive tweet back in UI insted of like being plus 1 it will be plus 2 or more,
            //this might be confusing to user

            // const tweet = responseData.tweets
            // const tweetFetchStatus = {[data.tweetId]: LOADED}
            // dispatch(tweetsFetchSuccess(tweet, tweetFetchStatus))
            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)
            // const tweetFetchStatus = {[data.tweetId]: ERROR}
            // const tweetError = {[data.tweetId]: err.message}

            dispatch(tweetToggleLike(data.tweetId))
            // dispatch(tweetsFetchError(tweetError, tweetFetchStatus))
            dispatch(globalErrorAdd(`${TWEET_TOGGLE_LIKE}/${data.tweetId}`, err.message))
            dispatch(hideLoading())
        }
    }
}

export function postTweet (data) {
    return async (dispatch, getState) => {
        dispatch(showLoading())
        dispatch(globalErrorRemove(`${TWEET_POST}`))
        console.log(data)
        try {
            const formData = new FormData()
            if (data.file) {
                formData.append('file', data.file)
            }
            formData.append('tweet', JSON.stringify(data.tweet))
            
            for (var key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            } 

            const tweetResponse = await fetch(`${URL}/user/tweet`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${data.user.token}`
                },
                body: formData
            })
            const tweetData = await tweetResponse.json()
            console.log(tweetData)


            if (tweetData.error) {
                dispatch(globalErrorAdd(`${TWEET_POST}`, tweetData.error))
            } else {
                const tweet = tweetData.tweet
                const tweetId = Object.keys(tweet)[0]
                const tweetFetchStatus = {[tweetId]: LOADED}
    
                const tweetShort = pick(tweet[tweetId], ['id', 'sortindex']) //does not have sortindex

                dispatch(tweetsFetchSuccess(tweet, tweetFetchStatus))

                // if (tweet[tweetId].replyingToTweetId) {
                //     dispatch(compositeDataClear(conversationKey(tweet[tweetId].replyingToTweetId)))
                //     dispatch(compositeDataClear(userRepliesKey(tweet[tweetId].user)))
                // } else {
                //     dispatch(compositeDataClear(userTweetsKey(tweet[tweetId].user)))
                // }

                // dispatch(compositeDataClear(homeKey()))

                // if (tweet.media) {
                //     dispatch(newTweetAddToUserImages(tweetShort, tweet[tweetId].user))
                // }
                //=====================================================================
                if (tweet[tweetId].replyingToTweetId) {
                    dispatch(newTweetAddToReplies(tweetShort, tweet[tweetId].replyingToTweetId, tweet[tweetId].user))
                } else {
                    dispatch(newTweetAddToUserTweets(tweetShort, tweet[tweetId].user))
                }

                dispatch(newTweetAddToFeed(tweetShort))

                if (tweet[tweetId].media) {
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

export function getUserTweetLikesPaginated (data) {
    return async (dispatch) => {
        dispatch(showLoading())
        const stateKey = userTweetLikesKey(data.userId)
        dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`))
        dispatch(compositeDataEntitiesFetch(stateKey))

        try {
            console.log('inside action getUserTweetLikesPaginated')
            const tweetsResponse = await fetch(`${URL}/users/${data.userId}/tweets/likes?take=${data.take}&skip=${data.skip}&time=${data.time}&getUsers=true`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                }
            })
            const tweetsData = await tweetsResponse.json()

            console.log(tweetsData)

            if (tweetsData.error) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, tweetsData.error))
                dispatch(compositeDataEntitiesFetchError(stateKey, tweetsData.error, data.time))
            } else {
                const tweets = tweetsData.tweets
                const users = tweetsData.users
                console.log('tweetsData ', tweetsData)
    
                const userTweets = Object.keys(tweets).map(tweetId => pick(tweets[tweetId], ['id', 'sortindex'])).sort((a,b) => b.sortindex - a.sortindex)
                console.log('userTweets ', userTweets) 
               
                const tweetsFetchStatus = mapValues(tweets, () => LOADED)
                const usersFetchStatus = mapValues(users, () => LOADED)
                
                dispatch(usersFetchSuccess(users, usersFetchStatus))
                dispatch(tweetsFetchSuccess(tweets, tweetsFetchStatus))
                dispatch(compositeDataEntitiesFetchSuccess(stateKey, userTweets, data.time))
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

export function getUserRepliesPaginated (data) {
    return async (dispatch) => {
        dispatch(showLoading())
        const stateKey = userRepliesKey(data.userId)
        dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`))
        dispatch(compositeDataEntitiesFetch(stateKey))

        try {
            console.log('inside action getUserRepliesPaginated')
            const tweetsResponse = await fetch(`${URL}/users/${data.userId}/tweets/replies?take=${data.take}&skip=${data.skip}&time=${data.time}&getUsers=false`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                }
            })
            const tweetsData = await tweetsResponse.json()
            if (tweetsData.error) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, tweetsData.error))
                dispatch(compositeDataEntitiesFetchError(stateKey, tweetsData.error, data.time))
            } else {
                const tweets = tweetsData.tweets
                console.log('tweetsData ', tweetsData)
    
                const userTweets = Object.keys(tweets).map(tweetId => pick(tweets[tweetId], ['id', 'sortindex'])).sort((a,b) => b.sortindex - a.sortindex)
                console.log('userTweets ', userTweets) 
               
                const tweetsFetchStatus = mapValues(tweets, () => LOADED)
    
                dispatch(tweetsFetchSuccess(tweets, tweetsFetchStatus))
                dispatch(compositeDataEntitiesFetchSuccess(stateKey, userTweets, data.time))
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

export function deleteTweet (data) {
    //data.stateKey - place from where tweet was deleted
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch(globalErrorRemove(`${TWEET_DELETE}/${data.tweetId}`))

        try {
            const response = await fetch(`${URL}/user/tweet/${data.tweetId}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                }
            })
            const responseData = await response.json() //{message: 'success', status: 'ok' or {error: {...}}
            if (responseData.error) {
                dispatch(globalErrorAdd(`${TWEET_DELETE}/${data.tweetId}`, responseData.error))
            } else {
                dispatch(compositeDataClear(data.stateKey))
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

