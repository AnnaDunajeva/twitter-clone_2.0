import {SESSION_START_ERROR, PROFILE_UPDATE} from '../action-types'

export function getSessionStartError () {
    return (state) => state.errors[SESSION_START_ERROR] || null
}

export function getProfileUpdateError () {
    return (state) => state.errors[PROFILE_UPDATE] || null
}