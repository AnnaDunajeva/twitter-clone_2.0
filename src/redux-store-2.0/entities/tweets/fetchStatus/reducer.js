import { 
    TWEETS_FETCH_SUCCESS,
    TWEETS_REMOVE_ALL,
    TWEETS_FETCH,
    TWEETS_FETCH_ERROR,
    SESSION_END_SUCCESS,
    TWEET_DELETE
} 
from '../../../action-types'
import {omit} from 'lodash'

export default function fetchStatus (state = {}, action){
    switch (action.type) {
        case TWEETS_FETCH:
        case TWEETS_FETCH_SUCCESS:
        case TWEETS_FETCH_ERROR:   
            return {
                ...state,
                ...(action.fetchStatus || {}) 
        }
        case SESSION_END_SUCCESS:
        case TWEETS_REMOVE_ALL: 
            return {}
        // case TWEET_DELETE:
        //     return omit(state, action.tweetId)
        default :
            return state
    }
}

