import {
    SESSION_END,
    SESSION_END_ERROR,
    SESSION_END_SUCCESS,
    SESSION_START,
    SESSION_START_ERROR,
    SESSION_START_SUCCESS,
    SIGN_UP_ERROR,
    SIGN_UP_SUCCESS,
    RESET_PASSWORD_LINK_SUCCESS,
    RESET_PASSWORD_LINK_ERROR,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
} from '../action-types'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { URL, LOADED, SIGN_UP } from "../constants"
import { globalErrorAdd, globalErrorRemove } from '../errors/actions'
import {getUserIdFromCookie} from '../../utils/helpers'


export function signUp (userData) {
    return async (dispatch) => {
        dispatch(showLoading())
        // dispatch({type: SESSION_START})
        dispatch(globalErrorRemove(SIGN_UP_ERROR))
        dispatch(globalErrorRemove(SESSION_START_ERROR))
        try {
            const response = await fetch(`${URL}/user`, {
                method: 'PUT',
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            //we dont get user profile back here jet, user has to verify email first
            //maybe add something like status so that i will be able to show alert message?
            const data = await response.json()

            console.log(userData)

            if (data.error) { //maybe check for status?
                console.log(`Error! ${data.error}`)
                // dispatch({type: SESSION_START_ERROR, error: data.error})
                dispatch(globalErrorAdd(SIGN_UP_ERROR, data.error))
            }
            else {
                // localStorage.setItem('userId', userData.userId)
                // localStorage.setItem('token', data.token)
                dispatch({type: SIGN_UP_SUCCESS}) //sets session fetch status to sign up
            }
            dispatch(hideLoading())
        }
        catch (err) {
            console.log(err.message)
            // dispatch({type: SESSION_START_ERROR, error: err.message})
            dispatch(globalErrorAdd(SIGN_UP_ERROR, err.message))
            dispatch(hideLoading())
        }
    }
}

// export function signUp (userData) {
//     return async (dispatch) => {
//         dispatch(showLoading())
//         // dispatch({type: SESSION_START})
//         // dispatch(globalErrorRemove(SESSION_START_ERROR))
//         try {
//             const response = await fetch(`${URL}/user`, {
//                 method: 'POST',
//                 mode: 'cors',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(userData)
//             })
//             //we get nothing back now
//             //maybe add some sing up status so that i will be able to show alert message?
//             const data = await response.json()

//             console.log(data, userData)

//             if (data.error) { //maybe check for status?
//                 console.log(`Error! ${data.error}`)
//                 // dispatch({type: SESSION_START_ERROR, error: data.error})
//                 // dispatch(globalErrorAdd(SESSION_START_ERROR, data.error)) //seems like should not duplicate info like that, I have to 
//                                                                         // deside how am i going to store errors, not both ways
//             }
//             // else {
//             //     localStorage.setItem('userId', userData.userId)
//             //     localStorage.setItem('token', data.token)
//             //     dispatch({type: SESSION_START_SUCCESS, userId: userData.userId, fetchStatus: LOADED})
//             // }
//             dispatch(hideLoading())
//         }
//         catch (err) {
//             console.log(err.message)
//             // dispatch({type: SESSION_START_ERROR, error: err.message})
//             // dispatch(globalErrorAdd(SESSION_START_ERROR, err.message))
//             dispatch(hideLoading())
//         }
//     }
// }

export function verifyAccount (token) {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch({type: SESSION_START})
        dispatch(globalErrorRemove(SESSION_START_ERROR))
        dispatch(globalErrorRemove(SIGN_UP_ERROR))
        try {
            const response = await fetch(`${URL}/identity/verify`, {
                method: 'PUT',
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify({token})
            })
            const data = await response.json()

            console.log(data)

            if (data.error) { //maybe check for status?
                console.log(`Error! ${data.error}`)
                dispatch({type: SESSION_START_ERROR, error: data.error})
                dispatch(globalErrorAdd(SESSION_START_ERROR, data.error)) //seems like should not duplicate info like that, I have to 
                                                                        //deside how am i going to store errors, not both ways
            }
            else {
                const userId = Object.keys(data.user)[0]
                // localStorage.setItem('userId', userId)
                // localStorage.setItem('token', data.token)
                dispatch({type: SESSION_START_SUCCESS, userId, fetchStatus: LOADED+''+SIGN_UP})
            }
            dispatch(hideLoading())
        }
        catch (err) {
            console.log(err.message)
            dispatch({type: SESSION_START_ERROR, error: err.message})
            dispatch(globalErrorAdd(SESSION_START_ERROR, err.message))
            dispatch(hideLoading())
        }
    }
}

export function login(userData) {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch({type: SESSION_START})
        dispatch(globalErrorRemove(SESSION_START_ERROR))

        try {
            const response = await fetch(`${URL}/user/login`, {
                method: 'PUT',
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    // 'CSRF-Token': document.cookie.replace(/(?:(?:^|.*;\s*)_csrf\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
                },
                body: JSON.stringify(userData)
            })
            const data = await response.json()
            console.log(data)

            if (data.error) {
                console.log(`Error! ${data.error}`)
                dispatch({type: SESSION_START_ERROR, error: data.error})
                dispatch(globalErrorAdd(SESSION_START_ERROR, data.error)) //seems like should not duplicate info like that, I have to 
                                                                        //deside how am i going to store errors, not both ways
            }
            else if (data.user) {
                // localStorage.setItem('userId', userData.userId)
                // localStorage.setItem('token', data.token)
                dispatch({type: SESSION_START_SUCCESS, users: data.user, userId: userData.userId, fetchStatus: LOADED})
            }
            dispatch(hideLoading())
        }
        catch (err) {
            console.log(err.message)
            dispatch({type: SESSION_START_ERROR, error: err.message})
            dispatch(globalErrorAdd(SESSION_START_ERROR, err.message))
            dispatch(hideLoading())
        }
    }
}

export function logOut() {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch({type: SESSION_END})
        dispatch(globalErrorRemove(SESSION_END_ERROR))
        try {
            const response = await fetch(`${URL}/user/logout`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1")
                }
            })
            const data = await response.json()
            console.log(data)
            if (data.error) {
                console.log(`Error! ${data.error}`)
                dispatch({type: SESSION_END_ERROR, error: data.error})
                dispatch(globalErrorAdd(SESSION_END_ERROR, data.error))
            }
            else {
                dispatch({type: SESSION_END_SUCCESS})
            }
            dispatch(hideLoading())
        }
        catch (err) {
            console.log(err.message)

            dispatch(hideLoading())
        }
    }
}

export function sendResetPasswordLink (email) {
    return async (dispatch) => {
        dispatch(showLoading())
        // dispatch({type: SESSION_START})
        dispatch(globalErrorRemove(RESET_PASSWORD_LINK_ERROR))
        dispatch(globalErrorRemove(SESSION_START_ERROR)) //possible that user tried to log in and got error
        try {
            const response = await fetch(`${URL}/identity/getResetPasswordLink`, {
                method: 'PUT',
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email})
            })
            const data = await response.json()

            if (data.error) { //maybe check for status?
                console.log(`Error! ${data.error}`)
                dispatch(globalErrorAdd(RESET_PASSWORD_LINK_ERROR, data.error))
            }
            else {
                dispatch({type: RESET_PASSWORD_LINK_SUCCESS}) //sets session fetch status to reset password link sent
            }
            dispatch(hideLoading())
        }
        catch (err) {
            console.log(err.message)
            // dispatch({type: SESSION_START_ERROR, error: err.message})
            dispatch(globalErrorAdd(RESET_PASSWORD_LINK_ERROR, err.message))
            dispatch(hideLoading())
        }
    }
}

export function resetPassword (data) {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch(globalErrorRemove(SESSION_START_ERROR)) //need to think if i need it here
        dispatch(globalErrorRemove(RESET_PASSWORD_LINK_ERROR))
        dispatch(globalErrorRemove(RESET_PASSWORD_ERROR))
        try {
            const response = await fetch(`${URL}/identity/resetPassword`, {
                method: 'PUT',
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: data.password,
                    token: data.token
                })
            })
            const responseData = await response.json()

            console.log(responseData)

            if (responseData.error) { //maybe check for status?
                console.log(`Error! ${responseData.error}`)
                dispatch(globalErrorAdd(RESET_PASSWORD_ERROR, responseData.error)) //seems like should not duplicate info like that, I have to 
                                                                        //deside how am i going to store errors, not both ways
            }
            else {
                // localStorage.removeItem('userId')
                // localStorage.removeItem('token')
                dispatch({type: SESSION_END_SUCCESS})
                dispatch({type: RESET_PASSWORD_SUCCESS}) //set session fetch status to password reset and logs out user
            }
            dispatch(hideLoading())
        }
        catch (err) {
            console.log(err.message)
            dispatch(globalErrorAdd(RESET_PASSWORD_ERROR, err.message))
            dispatch(hideLoading())
        }
    }
}