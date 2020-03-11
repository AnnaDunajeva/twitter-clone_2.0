import {SESSION_START_ERROR, USER_UPDATE} from '../action-types'

export function getSessionStartError () {
    return (state) => state.errors[SESSION_START_ERROR] || null
}

export function getUserUpdateError () {
    return (state) => state.errors[USER_UPDATE] || null
}