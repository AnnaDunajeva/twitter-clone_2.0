import { 
    TWEETS_FETCH_SUCCESS,
    TWEETS_REMOVE_ALL,
    TWEETS_FETCH,
    TWEETS_FETCH_ERROR,
    SESSION_END_SUCCESS
} 
from '../../action-types'

export default function fetchStatus () {
    return (state = {}, action) => {
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
            default :
                return state
        }
    }
}
