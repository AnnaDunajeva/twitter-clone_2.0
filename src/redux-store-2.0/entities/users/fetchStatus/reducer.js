import { 
    USERS_FETCH_SUCCESS,
    USERS_REMOVE_ALL,
    USERS_FETCH,
    USERS_FETCH_ERROR,
    SESSION_END_SUCCESS
} 
from '../../../action-types'

export default function fetchStatus (state = {}, action) {
    switch (action.type) {
        case USERS_FETCH:
        case USERS_FETCH_SUCCESS:
        case USERS_FETCH_ERROR:    
            return {
                ...state,
                ...(action.fetchStatus || {}) 
        }
        case SESSION_END_SUCCESS:
        case USERS_REMOVE_ALL:
            return {}
        default :
            return state
    }
}

