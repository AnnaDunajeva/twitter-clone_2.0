import { 
    LOADED, 
    LOADING, 
    ERROR, 
    SIGN_UP,
    PASSWORD_RESET,
    ACCOUNT_VERIFICATION_LINK_SENT,
    PASSWORD_RESET_LINK_SENT} from "../constants"
import { 
    SESSION_START_SUCCESS, 
    SESSION_START_ERROR, 
    SESSION_START, 
    SESSION_END, 
    SESSION_END_ERROR, 
    SESSION_END_SUCCESS, 
    SIGN_UP_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_LINK_SUCCESS,
    ACCOUNT_VERIFICATION_LINK_SUCCESS,
    SET_SESSION_FETCHSTATUS
} from '../action-types'
import {getUserIdFromCookie} from '../../utils/helpers'

const initialState = {
    userId: getUserIdFromCookie() || null, 
    fetchStatus: getUserIdFromCookie() ? LOADED : null,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SESSION_START:
        case SESSION_END:
            return {
                ...state,
                fetchStatus: LOADING,
                error: null
            }
        case SESSION_START_SUCCESS:
            return {
                ...state,
                userId: action.userId, //saved on refersh because of initial state
                fetchStatus: action.fetchStatus, 
                error: null
            }
        case SESSION_END_ERROR: 
        case SESSION_START_ERROR:
            return {
                ...state,
                fetchStatus: ERROR,
                error: action.error
            }

        case SESSION_END_SUCCESS: 
            return {
                userId: null,
                fetchStatus: null,
                error: null
            }
        case SET_SESSION_FETCHSTATUS: 
            return {
                ...state,
                fetchStatus: action.fetchStatus
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                error: null,
                fetchStatus: SIGN_UP
            }
        case ACCOUNT_VERIFICATION_LINK_SUCCESS:
            return {
                ...state,
                error: null,
                fetchStatus: ACCOUNT_VERIFICATION_LINK_SENT
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                fetchStatus: PASSWORD_RESET
            }
        case RESET_PASSWORD_LINK_SUCCESS:
            return {
                ...state,
                fetchStatus: PASSWORD_RESET_LINK_SENT
            }
        default:
            return state
    }
}