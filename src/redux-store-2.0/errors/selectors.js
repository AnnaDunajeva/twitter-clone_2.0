import {SESSION_START_ERROR, PROFILE_UPDATE, SIGN_UP_ERROR, RESET_PASSWORD_ERROR, RESET_PASSWORD_LINK_ERROR} from '../action-types'
import {AUTHENTICATION_FAILED} from '../constants'

export function getSessionStartError () {
    return (state) => state.errors[SESSION_START_ERROR] || null
}

export function getProfileUpdateError () {
    return (state) => state.errors[PROFILE_UPDATE] || null
}

export const getSignUpError = () => (state) => state.errors[SIGN_UP_ERROR] || null

export const isAuthenticationError = () => (state) => Object.values(state.errors).includes(AUTHENTICATION_FAILED) 

export const getResetPasswordError = () => (state) => state.errors[RESET_PASSWORD_ERROR] || null

export const getResetPasswordLinkError = () => (state) => state.errors[RESET_PASSWORD_LINK_ERROR] || null
