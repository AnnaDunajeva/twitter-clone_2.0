import { 
    LOADING, 
    LOADED, 
    ERROR } from "../constants"
import { 
    COMPOSITE_DATA_ENTITIES_FETCH, 
    COMPOSITE_DATA_ENTITIES_FETCH_SUCCESS, 
    COMPOSITE_DATA_ENTITIES_FETCH_ERROR,
    NEW_TWEET_ADD_TO_FEED,
    NEW_TWEET_ADD_TO_REPLIES,
    NEW_TWEET_ADD_TO_USER_TWEETS } from '../action-types'
import {homeKey, conversationKey, userTweetsKey} from '../utils/compositeDataStateKeys'

export const compositeDataEntitiesFetch = (stateKey) => {
    return {
        type: COMPOSITE_DATA_ENTITIES_FETCH,
        fetchStatus: LOADING,
        stateKey
    }
}

export const compositeDataEntitiesFetchSuccess = (stateKey, entities, lastTopFetchTimestamp) => { //entities is an array of ids
    return {
        type: COMPOSITE_DATA_ENTITIES_FETCH_SUCCESS,
        fetchStatus: LOADED,
        stateKey, 
        entities,
        lastTopFetchTimestamp
    }
}

export const compositeDataEntitiesFetchError = (stateKey, error, lastTopFetchTimestamp) => {
    return {
        type: COMPOSITE_DATA_ENTITIES_FETCH_ERROR,
        fetchStatus: ERROR,
        stateKey, 
        lastTopFetchTimestamp,
        error
    }
}

export const newTweetAddToFeed = (tweet) => {
    return {
        type: NEW_TWEET_ADD_TO_FEED,
        tweet,
        stateKey: homeKey(),
        fetchStatus: LOADED
    }
}

export const newTweetAddToReplies = (tweet, parentId) => {
    return {
        type: NEW_TWEET_ADD_TO_REPLIES,
        tweet,
        parentId,
        stateKey: conversationKey(parentId),
        fetchStatus: LOADED
    }
}

export const newTweetAddToUserTweets = (tweet, author) => {
    return {
        type: NEW_TWEET_ADD_TO_USER_TWEETS,
        tweet,
        author,
        stateKey: userTweetsKey(author),
        fetchStatus: LOADED
    }
}

// export const newTweetAddToUserTweets = (tweet, parentId) => {
//     return {
//         type: NEW_TWEET_ADD_TO_REPLIES,
//         tweet,
//         parentId,
//         stateKey: conversationKey(parentId),
//         fetchStatus: LOADING
//     }
// }



