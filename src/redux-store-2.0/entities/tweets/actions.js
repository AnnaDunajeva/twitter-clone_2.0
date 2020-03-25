import { 
    TWEETS_FETCH_SUCCESS,
    TWEETS_REMOVE_ALL,
    TWEETS_FETCH,
    TWEETS_FETCH_ERROR,
    TWEET_DELETE,
    TWEET_UPDATE,
    TWEET_DELETE_EXEPT_REPLIES
} 
from '../../action-types'

export const tweetsFetch = (ids, fetchStatus) => {
    return {
        type: TWEETS_FETCH,
        ids,
        fetchStatus
    }
}

export const tweetsFetchSuccess = (tweets, fetchStatus) => {
    return {
        type: TWEETS_FETCH_SUCCESS,
        tweets,
        fetchStatus
    }
}

export const tweetsFetchError = (errors, fetchStatus) => {
    return {
        type: TWEETS_FETCH_ERROR,
        errors,
        fetchStatus
    }
}

export const tweetsRemoveAll = () => {
    return {
        type: TWEETS_REMOVE_ALL
    }
}

export const tweetDelete = (tweetId) => { ///should put it i dunno maybe into keyedReducer actions, not here
    return {
        type: TWEET_DELETE,
        tweetId
    }
}
export const tweetDeleteExeptReplies = (tweetId) => { ///should put it i dunno maybe into keyedReducer actions, not here
    return {
        type: TWEET_DELETE_EXEPT_REPLIES,
        tweetId
    }
}

export const tweetUpdate = (tweetId, tweet, fetchStatus) =>({
    type: TWEET_UPDATE,
    tweetId,
    tweet,
    fetchStatus
})