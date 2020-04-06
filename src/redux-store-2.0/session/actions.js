import {SET_SESSION_FETCHSTATUS} from '../action-types'

export const setSessionFetchStatus = (fetchStatus) => ({
    type: SET_SESSION_FETCHSTATUS,
    fetchStatus
})