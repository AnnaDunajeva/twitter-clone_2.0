import {SESSION_START_ERROR, PROFILE_UPDATE, SIGN_UP_ERROR} from '../action-types'

export function getSessionStartError () {
    return (state) => state.errors[SESSION_START_ERROR] || null
}

export function getProfileUpdateError () {
    return (state) => state.errors[PROFILE_UPDATE] || null
}

export const getSignUpError = () => (state) => state.errors[SIGN_UP_ERROR] || null