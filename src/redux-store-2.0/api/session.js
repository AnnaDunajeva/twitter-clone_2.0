import {
    SESSION_END,
    SESSION_END_ERROR,
    SESSION_END_SUCCESS,
    SESSION_START,
    SESSION_START_ERROR,
    SESSION_START_SUCCESS,
    SIGN_UP_ERROR,
    SIGN_UP_SUCCESS
} from '../action-types'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { URL, LOADED, SIGN_UP } from "../constants"
import { globalErrorAdd, globalErrorRemove } from '../errors/actions'



export function signUp (userData) {
    return async (dispatch) => {
        dispatch(showLoading())
        // dispatch({type: SESSION_START})
        dispatch(globalErrorRemove(SIGN_UP_ERROR))
        dispatch(globalErrorRemove(SESSION_START_ERROR))
        try {
            const response = await fetch(`${URL}/user`, {
                method: 'POST',
                mode: 'cors',
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
            const response = await fetch(`${URL}/user/verify/${token}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
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
                localStorage.setItem('userId', userId)
                localStorage.setItem('token', data.token)
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
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
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
                localStorage.setItem('userId', userData.userId)
                localStorage.setItem('token', data.token)
                dispatch({type: SESSION_START_SUCCESS, entities: data.user, userId: userData.userId, fetchStatus: LOADED})
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

export function logOut(user) {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch({type: SESSION_END})
        dispatch(globalErrorRemove(SESSION_END_ERROR))
        try {
            const response = await fetch(`${URL}/user/logout`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
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
                localStorage.removeItem('userId')
                localStorage.removeItem('token')

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