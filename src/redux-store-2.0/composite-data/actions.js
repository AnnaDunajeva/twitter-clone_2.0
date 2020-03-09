import { 
    LOADING, 
    LOADED, 
    ERROR } from "../constants"
import { 
    COMPOSITE_DATA_ENTITIES_FETCH, 
    COMPOSITE_DATA_ENTITIES_FETCH_SUCCESS, 
    COMPOSITE_DATA_ENTITIES_FETCH_ERROR,
    NEW_TWEET_ADD_TO_FEED } from '../action-types'
import {homeKey} from '../utils/compositeDataStateKeys'

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
        fetchStatus: LOADING
    }
}

// export const setLastTopFetchTimestamp = (stateKey, lastTopFetchTimestamp) => {
//     return {
//         type: LAST_TOP_FETCH_TIMESTAMP_SET,
//         lastTopFetchTimestamp,
//         stateKey
//     }
// }


