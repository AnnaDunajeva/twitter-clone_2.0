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
    ACCOUNT_VERIFICATION_LINK_SUCCESS,
    ACCOUNT_VERIFICATION_LINK_ERROR } from '../action-types'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { URL, LOADED, SIGN_UP } from "../constants"
import { globalErrorAdd, globalErrorRemove } from '../errors/actions'
import { getAuthedUserId } from '../session/selectors'

export function signUp (userData) {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch(globalErrorRemove(SIGN_UP_ERROR))
        dispatch(globalErrorRemove(SESSION_START_ERROR))
        try {
            const response = await fetch(`${URL}/user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            const data = await response.json()

            console.log(userData)

            if (data.error) { //maybe check for status?
                console.log(`Error! ${data.error}`)
                dispatch(globalErrorAdd(SIGN_UP_ERROR, data.error))
            }
            else {
                dispatch({type: SIGN_UP_SUCCESS}) //sets session fetch status to sign up
            }
            dispatch(hideLoading())
        }
        catch (err) {
            console.log(err.message)
            dispatch(globalErrorAdd(SIGN_UP_ERROR, err.message))
            dispatch(hideLoading())
        }
    }
}

export function verifyAccount (token) {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch({type: SESSION_START})
        dispatch(globalErrorRemove(SESSION_START_ERROR))
        dispatch(globalErrorRemove(SIGN_UP_ERROR))
        try {
            const response = await fetch(`${URL}/identity/verify`, {
                method: 'PUT',
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
                dispatch({type: SESSION_START_SUCCESS, userId, users: data.user, fetchStatus: LOADED+''+SIGN_UP})
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
                headers: {
                    'Content-Type': 'application/json',
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

export const requestAccountVerificationLink = (email) => {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch(globalErrorRemove(ACCOUNT_VERIFICATION_LINK_ERROR))
        dispatch(globalErrorRemove(SESSION_START_ERROR)) //possible that user tried to log in and got error
        try {
            const response = await fetch(`${URL}/identity/getVerifyAccountLink`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email})
            })
            const data = await response.json()

            if (data.error) { 
                dispatch(globalErrorAdd(ACCOUNT_VERIFICATION_LINK_ERROR, data.error))
            }
            else {
                dispatch({type: ACCOUNT_VERIFICATION_LINK_SUCCESS}) //will display message that link was sent
            }
            dispatch(hideLoading())
        }
        catch (err) {
            console.log(err.message)
            dispatch(globalErrorAdd(ACCOUNT_VERIFICATION_LINK_ERROR, err.message))
            dispatch(hideLoading())
        }
    }
}

export const completeGoogleAuthAccount = (data) => {
    return async (dispatch, getState) => {
        dispatch(showLoading())
        // dispatch(globalErrorRemove(SOCIAL_AUTH_ACCOUNT_VERIFICATION_ERROR))
        dispatch(globalErrorAdd(SESSION_START_ERROR))        
        const state = getState()
        try {
            const responseData = await fetch(`${URL}/identity/googleAuth/completeAccount`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const response = await responseData.json()

            if (response.error) { 
                // dispatch(globalErrorAdd(SOCIAL_AUTH_ACCOUNT_VERIFICATION_ERROR, data.error))
                dispatch({type: SESSION_START_ERROR, error: response.error})
                dispatch(globalErrorAdd(SESSION_START_ERROR, response.error))
            }
            else if (data.user) {
                const userId = getAuthedUserId()(state)
                dispatch({type: SESSION_START_SUCCESS, users: response.user, userId, fetchStatus: LOADED+''+SIGN_UP})
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

// export const googleSignIn = () => {
//     return async (dispatch, getState) => {
//         dispatch(showLoading())
//         dispatch({type: SESSION_START})
//         dispatch(globalErrorRemove(SESSION_START_ERROR))
//         const state = getState()

//         try {
//             const response = await fetch(`${URL}/user/login/google`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             })
//             const data = await response.json()
//             console.log(data)

//             if (data.error) {
//                 console.log(`Error! ${data.error}`)
//                 dispatch({type: SESSION_START_ERROR, error: data.error})
//                 dispatch(globalErrorAdd(SESSION_START_ERROR, data.error))
//             }
//             else if (data.verificationToken) {
//                 localStorage.setItem('token', data.verificationToken)
//             }
//             else if (data.user && !data.verificationToken) {
//                 const userId = getAuthedUserId()(state)
//                 dispatch({type: SESSION_START_SUCCESS, users: data.user, userId, fetchStatus: LOADED})
//             }
//             dispatch(hideLoading())
//         }
//         catch (err) {
//             console.log(err.message)
//             dispatch({type: SESSION_START_ERROR, error: err.message})
//             dispatch(globalErrorAdd(SESSION_START_ERROR, err.message))
//             dispatch(hideLoading())
//         }
//     }
// }