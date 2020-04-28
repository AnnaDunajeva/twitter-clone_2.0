import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {SESSION_END_SUCCESS} from '../redux-store-2.0/action-types'
import {isAuthenticationError} from '../redux-store-2.0/errors/selectors'
import {getSocket} from '../redux-store-2.0/socket/selectors'
import {getUserIdFromCookie} from '../utils/helpers'

const useLogOutOnAuthenticatonError = () => {
    const dispatch = useDispatch()
    const authenticationError = useSelector(isAuthenticationError())
    const authedUser = getUserIdFromCookie()
    const socket = useSelector(getSocket())

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
