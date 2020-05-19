import {
    SESSION_START_ERROR, 
    SESSION_END_ERROR,
    PROFILE_UPDATE, 
    SIGN_UP_ERROR, 
    RESET_PASSWORD_ERROR, 
    RESET_PASSWORD_LINK_ERROR,
    TWEET_TOGGLE_LIKE,
    TWEET_POST,
    USER_TOGGLE_FOLLOW,
    TWEET_DELETE,
    ACCOUNT_VERIFICATION_LINK_ERROR,
    COMPOSITE_DATA_ENTITIES_FETCH_ERROR
} from '../action-types'
import {AUTHENTICATION_FAILED} from '../constants'

export function getSessionStartError () {
    return (state) => state.errors[SESSION_START_ERROR] || null
}

export const getSessionEndError = () => (state) => state.errors[SESSION_END_ERROR] || null

export function getProfileUpdateError () {
    return (state) => state.errors[PROFILE_UPDATE] || null
}

export const getSignUpError = () => (state) => state.errors[SIGN_UP_ERROR] || null

export const isAuthenticationError = () => (state) => Object.values(state.errors).includes(AUTHENTICATION_FAILED) 

export const getResetPasswordError = () => (state) => state.errors[RESET_PASSWORD_ERROR] || null

export const getResetPasswordLinkError = () => (state) => state.errors[RESET_PASSWORD_LINK_ERROR] || null

export const getAccountVerificationLinkError = () => (state) => state.errors[ACCOUNT_VERIFICATION_LINK_ERROR] || null

export const getToggleTweetLikeErrors = () => (state) => Object.keys(state.errors)
                                                        .filter(stateKey => stateKey.includes(TWEET_TOGGLE_LIKE))
                                                        .map(stateKey => state.errors[stateKey])

export const getPostTweetError = () => (state) => state.errors[TWEET_POST] || null

export const getDeleteTweetError = () => (state) => state.errors[TWEET_DELETE] || null

export const getUserToggleFollowErrors = () => state => Object.keys(state.errors)
                                                        .filter(stateKey => stateKey.includes(USER_TOGGLE_FOLLOW))
                                                        .map(stateKey => state.errors[stateKey])

