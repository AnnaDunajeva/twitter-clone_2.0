import { 
    SESSION_END_SUCCESS,
    USERS_FETCH_SUCCESS,
    USERS_REMOVE_ALL,
    USER_TOGGLE_FOLLOW
} 
from '../../../action-types'

export default function users () {
    return (state = {}, action) => {
        switch (action.type) {
            case USERS_FETCH_SUCCESS :
                return {
                    ...state,
                    ...action.entities
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
            case USERS_REMOVE_ALL:
            case SESSION_END_SUCCESS:
                return {}
            default :
                return state
        } 
    }
}

