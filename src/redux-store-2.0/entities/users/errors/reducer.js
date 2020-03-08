import {omit} from 'lodash'
import { 
    USERS_FETCH_SUCCESS,
    USERS_REMOVE_ALL,
    USERS_FETCH,
    USERS_FETCH_ERROR,
    SESSION_END_SUCCESS
} 
from '../../action-types'

export default function errors () {
    return (state = {}, action) => {
        switch (action.type) {
            case USERS_FETCH:
                return action.ids 
                    ? omit(state, action.ids)
                    : state
            case USERS_FETCH_SUCCESS:
                return omit(state, Object.keys(action.users))
            case USERS_FETCH_ERROR:
                return {
                    ...state,
                    ...action.errors
                }
            case USERS_REMOVE_ALL: 
            case SESSION_END_SUCCESS:
                return {}
            default :
                return state
        }
    }
}