import {SESSION_START_ERROR} from '../action-types'

export function getSessionStartError () {
    return (state) => state.errors[SESSION_START_ERROR] || null
}