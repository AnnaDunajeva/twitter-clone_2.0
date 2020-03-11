import { 
    SESSION_END_SUCCESS,
    SESSION_START_SUCCESS,
    USERS_FETCH_SUCCESS,
    USERS_REMOVE_ALL,
    USER_TOGGLE_FOLLOW
} 
from '../../../action-types'
import {formatUser} from '../../../../utils/helpers'
import {mapValues} from 'lodash'

export default function users (state = {}, action) {
    switch (action.type) {
        case SESSION_START_SUCCESS:
        case USERS_FETCH_SUCCESS :
            const formatedUsers = mapValues(action.users, (user) => formatUser(user))
            return {
                ...state,
                ...formatedUsers
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

