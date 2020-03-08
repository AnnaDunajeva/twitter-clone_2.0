import { 
    USERS_FETCH_SUCCESS,
    USERS_REMOVE_ALL,
    USERS_FETCH,
    USERS_FETCH_ERROR
} 
from '../../../action-types'

export const usersFetch = (ids, fetchStatus) => {
    return {
        type: USERS_FETCH,
        ids,
        fetchStatus
    }
}

export const usersFetchSuccess = (entities, fetchStatus) => {
    return {
        type: USERS_FETCH_SUCCESS,
        entities,
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
