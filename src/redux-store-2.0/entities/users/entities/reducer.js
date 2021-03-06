import { 
    SESSION_END_SUCCESS,
    SESSION_START_SUCCESS,
    USERS_FETCH_SUCCESS,
    USERS_REMOVE_ALL,
    USER_TOGGLE_FOLLOW,
    USER_UPDATE
} 
from '../../../action-types'

export default function users (state = {}, action) {
    switch (action.type) {
        case SESSION_START_SUCCESS:
        case USERS_FETCH_SUCCESS :
            return {
                ...state,
                ...action.users
            }
        case USER_TOGGLE_FOLLOW:
            const isFollowing = state[action.userId].following
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    following: !isFollowing,
                    followersCount: !isFollowing ? state[action.userId].followersCount + 1 : state[action.userId].followersCount - 1,
                }
            }
        case USER_UPDATE:
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    ...action.user[action.userId]
                }
            }
        case USERS_REMOVE_ALL:
        case SESSION_END_SUCCESS:
            return {}
        default :
            return state
    } 
}

