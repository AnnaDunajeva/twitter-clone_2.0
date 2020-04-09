import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {SESSION_END_SUCCESS} from '../redux-store-2.0/action-types'
import {isAuthenticationError} from '../redux-store-2.0/errors/selectors'
import {getSocket} from '../redux-store-2.0/socket/selectors'

const useLogOutOnAuthenticatonError = () => {
    const dispatch = useDispatch()
    const authenticationError = useSelector(isAuthenticationError())
    const socket = useSelector(getSocket())

    useEffect(() => {
        if (authenticationError) {
            console.log('authenticationError')
            
            localStorage.removeItem('userId')
            // localStorage.removeItem('token')

            if (socket) {
                socket.close()
            }
            dispatch({type: SESSION_END_SUCCESS})
        }
    }, [authenticationError, dispatch, socket])

}

export default useLogOutOnAuthenticatonError
