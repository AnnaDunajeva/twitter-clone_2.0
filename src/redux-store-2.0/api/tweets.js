import { pick, mapValues } from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { 
    LOADED, 
    URL } from "../constants"

import { tweetsFetchSuccess } from '../entities/tweets/actions'
import { tweetToggleLike } from '../entities/tweets/entities/actions'
import { usersFetchSuccess } from '../entities/users/actions'
import { globalErrorAdd, globalErrorRemove } from '../errors/actions'
import { getTweetById } from '../entities/tweets/entities/selectors'
import { 
        COMPOSITE_DATA_ENTITIES_FETCH_ERROR,
        TWEET_TOGGLE_LIKE,
        TWEET_POST } from '../action-types'
import { 
    compositeDataEntitiesFetch, 
    compositeDataEntitiesFetchSuccess,
    compositeDataEntitiesFetchError } from '../composite-data/actions'
import { 
    conversationKey,
    homeKey,
    userTweetsKey } from '../utils/compositeDataStateKeys'

export function getFeedPaginated(data) {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${homeKey()}`))
        dispatch(compositeDataEntitiesFetch(homeKey()))
        try{
            console.log('inside action getFeedPaginated')
            const feedResponse = await fetch(`${URL}/user/feed
                                            ?take=${data.take}
                                            &skip=${data.skip}
                                            &time=${data.time}
                                            &getUsers=true
                                            &getParents=false`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                }
            })
            
            const feedData = await feedResponse.json()
            console.log('feedData ', feedData)
            
            const feed = Object.keys(feedData.tweets).map(tweetId => pick(feedData.tweets[tweetId], ['tweetId', 'sortIndex'])).sort((a,b) => b.sortIndex - a.sortIndex)
            console.log('feed ', feed) 
           
            const tweetsFetchStatus = mapValues(feedData.tweets, LOADED)
            const usersFetchStatus = mapValues(feedData.users, LOADED)

            dispatch(compositeDataEntitiesFetchSuccess(homeKey(), feed, data.time))
            dispatch(tweetsFetchSuccess(feedData.tweets, tweetsFetchStatus))
            dispatch(usersFetchSuccess(feedData.users, usersFetchStatus))
            dispatch(hideLoading())
        }
        catch(err) {
            console.log(err.message)

            dispatch(compositeDataEntitiesFetchError(homeKey(), err.message, data.time))
            dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${homeKey()}`, err.message))
            dispatch(hideLoading())
        }
    }
}

export function getConversationPaginated (data) {
    return async (dispatch) => {
        dispatch(showLoading())
        const stateKey = conversationKey(data.tweetId)
        dispatch(compositeDataEntitiesFetch(stateKey))
        dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`))

        try {
            console.log('inside action getRepliesPaginated')
            const response = await fetch(`${URL}/user/tweets/${data.tweetId}/replies
                                                ?take=${data.take}
                                                &skip=${data.skip}
                                                &time=${data.time}
                                                &getUsers=true`, { //NB!!!! needs to be added in backend...
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                }
            })
            const responseData = await response.json() //{tweets: {someId: {...}}}
            const tweets = responseData.tweets
            const users = responseData.users

            const conversation = Object.keys(tweets).map(tweetId => pick(tweets[tweetId], ['tweetId', 'sortIndex', 'type'])).sort((a,b) => b.sortIndex - a.sortIndex)
            console.log('feed ', feed) 
           
            const tweetsFetchStatus = mapValues(tweets, LOADED)
            const usersFetchStatus = mapValues(users, LOADED)

            dispatch(compositeDataEntitiesFetchSuccess(stateKey, conversation, data.time))
            dispatch(tweetsFetchSuccess(tweets, tweetsFetchStatus))
            dispatch(usersFetchSuccess(users, usersFetchStatus))

            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)

            dispatch(compositeDataEntitiesFetchError(stateKey, err.message, data.time))
            dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, err.message))
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
            const tweetsResponse = await fetch(`${URL}/users/${data.userId}/tweets
                                                ?take=${data.take}
                                                &skip=${data.skip}
                                                &time=${data.time}
                                                &getUsers=false
                                                &getParents=false`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                }
            })
            const tweetsData = await tweetsResponse.json()
            const tweets = tweetsData.tweets
            console.log('tweetsData ', tweetsData)

            const userTweets = Object.keys(tweets).map(tweetId => pick(tweets[tweetId], ['tweetId', 'sortIndex'])).sort((a,b) => b.sortIndex - a.sortIndex)
            console.log('feed ', feed) 
           
            const tweetsFetchStatus = mapValues(tweets, LOADED)

            dispatch(compositeDataEntitiesFetchSuccess(stateKey, userTweets, data.time))
            dispatch(tweetsFetchSuccess(tweets, tweetsFetchStatus))
            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)

            dispatch(compositeDataEntitiesFetchError(stateKey, err.message, data.time))
            dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${stateKey}`, err.message))
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
                },
                body: JSON.stringify({hasLiked: getTweetById(getState(), data.tweetId).liked})
            })
            const responseData = await response.json() //{message: 'success', tweets: {...}, parents:{...}} or {err: {...}}
            
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
            dispatch(globalErrorAdd(`${TWEET_TOGGLE_LIKE}/${tweetId}`, err.message))
            dispatch(hideLoading())
        }
    }
}

export function postTweet (data) {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch(globalErrorRemove(`${TWEET_POST}`))

        try {
            const tweetResponse = await fetch(`${URL}/user/tweet`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                },
                body: JSON.stringify(data.tweet)
            })
            const tweetData = await tweetResponse.json()
            const tweet = tweetData.tweet
            const tweetId = Object.keys(tweet)[0]
            const tweetFetchStatus = {[tweetId]: LOADED}

            dispatch(tweetsFetchSuccess(tweet, tweetFetchStatus))
            
            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)

            dispatch(globalErrorAdd(`${TWEET_POST}`, err.message))
            dispatch(hideLoading())
        }
    }
}