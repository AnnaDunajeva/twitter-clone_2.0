import {useDispatch, useSelector} from 'react-redux'
import {logOut} from '../redux-store-2.0/api/session'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import {getSocket} from '../redux-store-2.0/socket/selectors'

const useLogOut = () => {
    const authedUser = useSelector(getAuthedUserId())
    const dispatch = useDispatch()
    const socket = useSelector(getSocket())
    
    const logOutUser = () => {
        const user = {
            userId: authedUser || localStorage.getItem('userId'),
            token: localStorage.getItem('token')
        }
        socket.close()
        dispatch(logOut(user))
    }

    return logOutUser
}
export default useLogOut