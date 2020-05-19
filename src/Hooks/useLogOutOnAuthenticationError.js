import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {SESSION_END_SUCCESS} from '../redux-store-2.0/action-types'
import {isAuthenticationError} from '../redux-store-2.0/errors/selectors'
import {getSocket} from '../redux-store-2.0/socket/selectors'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'

const useLogOutOnAuthenticatonError = () => {
    const dispatch = useDispatch()
    const authenticationError = useSelector(isAuthenticationError())
    const authedUser = useSelector(getAuthedUserId())
    const socket = useSelector(getSocket())

    useEffect(() => {
        if (authenticationError && authedUser) {
            console.log('authenticationError')
            document.cookie = 'id=;'
            //cant close socket from sockeetSetup cause by that time socket will be removed from store
            if (socket) {
                socket.close()
            }
            dispatch({type: SESSION_END_SUCCESS})
        }
    }, [authenticationError, dispatch, authedUser])

}

export default useLogOutOnAuthenticatonError
