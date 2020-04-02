import { 
    LOADED, 
    LOADING, 
    ERROR, 
    SIGN_UP} from "../constants"
import { 
    SESSION_START_SUCCESS, 
    SESSION_START_ERROR, 
    SESSION_START, 
    SESSION_END, 
    SESSION_END_ERROR, 
    SESSION_END_SUCCESS, 
    SIGN_UP_SUCCESS
} from '../action-types'

const initialState = {
    userId: localStorage.getItem('userId') || null,
    fetchStatus: null,
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
                userId: action.userId,
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
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                fetchStatus: SIGN_UP
            }
        default:
            return state
    }
}