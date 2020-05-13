import { useEffect } from 'react'
// import {useSelector, useDispatch} from 'react-redux'
import * as redux from 'react-redux'
import {SESSION_END_SUCCESS} from '../redux-store-2.0/action-types'
import {isAuthenticationError} from '../redux-store-2.0/errors/selectors'
import {getSocket} from '../redux-store-2.0/socket/selectors'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'

const useLogOutOnAuthenticatonError = () => {
    const dispatch = redux.useDispatch()
    const authenticationError = redux.useSelector(isAuthenticationError())
    const authedUser = redux.useSelector(getAuthedUserId())
    const socket = redux.useSelector(getSocket())

    useEffect(() => {
        if (authenticationError && authedUser) {
            console.log('authenticationError')
            document.cookie = 'id=;'
            if (socket) {
                socket.close()
            }
            dispatch({type: SESSION_END_SUCCESS})
        }
    }, [authenticationError, dispatch, socket, authedUser])

}

export default useLogOutOnAuthenticatonError
