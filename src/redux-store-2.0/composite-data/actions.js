import { 
    LOADING, 
    LOADED, 
    ERROR,
    PENDING_UPDATE } from "../constants"
import { 
    COMPOSITE_DATA_ENTITIES_FETCH, 
    COMPOSITE_DATA_ENTITIES_FETCH_SUCCESS, 
    COMPOSITE_DATA_ENTITIES_FETCH_ERROR,
    NEW_TWEET_ADD_TO_FEED,
    NEW_TWEET_ADD_TO_REPLIES,
    NEW_TWEET_ADD_TO_USER_TWEETS,
    NEW_TWEET_ADD_TO_USER_IMAGES,
    NEW_LIKE_ADD_TO_USER_LIKES,
    NEW_LIKE_REMOVE_FROM_USER_LIKES,
    NEW_TWEET_ADD_TO_USER_REPLIES,
    COMPOSITE_DATA_SET_FETCH_STATUS,
    COMPOSITE_DATA_SET_DONE,
    COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_SUCCESS,
    COMPOSITE_DATA_CLEAR} from '../action-types'
import {homeKey, conversationKey, userTweetsKey, userTweetImagesKey, userTweetLikesKey, userRepliesKey} from '../utils/compositeDataStateKeys'

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
export const compositeDataEntitiesUpdateFetchSuccess = (stateKey, entities) => ({
    type: COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_SUCCESS,
    entities,
    stateKey
})

export const compositeDataEntitiesFetchError = (stateKey, error, lastTopFetchTimestamp) => {
    return {
        type: COMPOSITE_DATA_ENTITIES_FETCH_ERROR,
        fetchStatus: ERROR,
        stateKey, 
        lastTopFetchTimestamp,
        error
    }
}
export const compositeDataSetFetchStatus = (stateKey, fetchStatus) => ({
    type: COMPOSITE_DATA_SET_FETCH_STATUS,
    fetchStatus,
    stateKey
})

export const newTweetAddToFeed = (tweet) => {
    return {
        type: NEW_TWEET_ADD_TO_FEED,
        tweet,
        stateKey: homeKey()
        // fetchStatus: LOADED
    }
}

export const newTweetAddToReplies = (tweet, parentId, author) => {
    return {
        type: NEW_TWEET_ADD_TO_REPLIES,
        tweet,
        parentId,
        author,
        stateKey: conversationKey(parentId)
        // fetchStatus: LOADED
    }
}
export const newTweetAddToUserReplies = (tweet, parentId, author) => {
    return {
        type: NEW_TWEET_ADD_TO_USER_REPLIES,
        tweet,
        parentId,
        author,
        stateKey: userRepliesKey(author)
        // fetchStatus: LOADED
    }
}
//if keyedReducer gets some statekey, it will create it if it was undefined, so if i post new tweet but profiletweets were
//not loaded, userTweets will be created and tweet will be added setting fetchstatus to loaded, so if i the go to this view
//it wont do extra fetch to get data and say that this one tweet is the only one cause status is loaded. One solution is to
//set fetchstatus to pending in view where i can post tweet from (cause i need new fetch only there), but then i need to 
//remember where tweet can be posted from. And what if i add functionality to post tweet from any location?
export const newTweetAddToUserTweets = (tweet, author) => {
    return {
        type: NEW_TWEET_ADD_TO_USER_TWEETS,
        tweet,
        author,
        stateKey: userTweetsKey(author)
        // fetchStatus: LOADED
    }
}
export const newTweetAddToUserImages = (tweet, author) => {
    return {
        type: NEW_TWEET_ADD_TO_USER_IMAGES,
        tweet,
        author,
        stateKey: userTweetImagesKey(author)
        // fetchStatus: LOADED
    }
}
export const newLikeAddToUserLikes = (tweet, userId) => {
    return {
        type: NEW_LIKE_ADD_TO_USER_LIKES,
        tweet,
        userId,
        stateKey: userTweetLikesKey(userId),
        fetchStatus: LOADED
    }
}
export const newLikeRemoveFromUserLikes = (tweetId, userId) => {
    return {
        type: NEW_LIKE_REMOVE_FROM_USER_LIKES,
        tweetId,
        userId,
        stateKey: userTweetLikesKey(userId),
    }
}

export const compositeDataClear = (stateKey) => {
    return {
        type: COMPOSITE_DATA_CLEAR,
        stateKey
    }
}
export const compositeDataSetDone = (stateKey, done) => ({
    type: COMPOSITE_DATA_SET_DONE,
    stateKey,
    done
})

// export const compositeDataRemoveTweetExeptReplies = () => ({
//     //will be reduced in keyedREducer
//     type: COMPOSITE_DATA_REMOVE_TWEET_EXEPT_REPLIES
// })

// export const newTweetAddToUserTweets = (tweet, parentId) => {
//     return {
//         type: NEW_TWEET_ADD_TO_REPLIES,
//         tweet,
//         parentId,
//         stateKey: conversationKey(parentId),
//         fetchStatus: LOADING
//     }
// }



