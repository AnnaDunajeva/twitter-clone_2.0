import {omit} from 'lodash'
import { 
    TWEETS_FETCH_SUCCESS,
    TWEETS_REMOVE_ALL,
    TWEETS_FETCH,
    TWEETS_FETCH_ERROR,
    SESSION_END_SUCCESS
} 
from '../../../action-types'

export default function errors (state = {}, action) {
    switch (action.type) {
        case TWEETS_FETCH:
            return action.ids 
                ? omit(state, action.ids)
                : state
        case TWEETS_FETCH_SUCCESS:
            return omit(state, Object.keys(action.tweets))
        case TWEETS_FETCH_ERROR:
            return {
                ...state,
                ...action.errors
            }
        case TWEETS_REMOVE_ALL: 
        case SESSION_END_SUCCESS:
            return {}
        default :
            return state
    }
}
