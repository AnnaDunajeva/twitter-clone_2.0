import {formatUser} from '../../../utils/helpers'
import{mapValues} from 'lodash'

import { 
    USERS_FETCH_SUCCESS,
    USERS_REMOVE_ALL,
    USERS_FETCH,
    USERS_FETCH_ERROR,
    USERS_FETCH_STATUS_SET
} 
from '../../action-types'

export const usersFetch = (ids, fetchStatus) => {
    return {
        type: USERS_FETCH,
        ids,
        fetchStatus
    }
}

export const usersFetchSuccess = (users, fetchStatus) => {
    return {
        type: USERS_FETCH_SUCCESS,
        users,
        fetchStatus
    }
}

export const usersFetchError = (errors, fetchStatus) => {
    return {
        type: USERS_FETCH_ERROR,
        errors,
        fetchStatus
    }
}

export const usersRemoveAll = () => {
    return {
        type: USERS_REMOVE_ALL
    }
}

export const usersFetchStatusSet = (fetchStatus) => {
    return {
        type: USERS_FETCH_STATUS_SET,
        fetchStatus
    }
}
