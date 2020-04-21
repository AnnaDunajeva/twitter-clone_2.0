import {useDispatch, useSelector} from 'react-redux'
import {logOut} from '../redux-store-2.0/api/session'
import {getSocket} from '../redux-store-2.0/socket/selectors'

const useLogOut = () => {
    const dispatch = useDispatch()
    const socket = useSelector(getSocket())
    
    const logOutUser = () => {
        if (socket) {
            socket.close()
        }
        dispatch(logOut())
    }

    return logOutUser
}
export default useLogOut