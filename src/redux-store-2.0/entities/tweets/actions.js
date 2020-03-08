import { 
    TWEETS_FETCH_SUCCESS,
    TWEETS_REMOVE_ALL,
    TWEETS_FETCH,
    TWEETS_FETCH_ERROR
} 
from '../../../action-types'

export const tweetsFetch = (ids, fetchStatus) => {
    return {
        type: TWEETS_FETCH,
        ids,
        fetchStatus
    }
}

export const tweetsFetchSuccess = (entities, fetchStatus) => {
    return {
        type: TWEETS_FETCH_SUCCESS,
        entities,
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
