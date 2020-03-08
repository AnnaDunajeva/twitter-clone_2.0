import { omit } from 'lodash';
import { SESSION_END_SUCCESS } from '../action-types';

//names of actions that can be here:
// `COMPOSITE_DATA_ENTITIES_FETCH_ERROR/${stateKey}`
// 'SESSION_END_ERROR'
// 'SESSION_START_ERROR'
// `TWEET_TOGGLE_LIKE/${tweetId}`
// 'TWEETS_FETCH_ERROR'
// 'USERS_FETCH_ERROR'
// 'TWEET_POST'

export default function errors (state = {}, action) {
    switch (action.type) {
        case GLOBAL_ERROR_ADD:
            return {
                ...state,
                [action.name]: action.error
            }
        case GLOBAL_ERROR_REMOVE:
            return omit(state, action.name)
        case SESSION_END_SUCCESS: 
            return {}
        default:
            return state
    }
}







