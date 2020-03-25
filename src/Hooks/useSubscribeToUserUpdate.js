import {getSocket} from '../redux-store-2.0/socket/selectors'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'

const useSubscribeToUserUpdate = (user) => {
    const socket = useSelector(getSocket())

    useEffect(()=>{
        if(user && !user.deleted && socket) {
            console.log('about to subscribe to user update ', user.userId)
            socket.emit('subscribe_to_user_update', user.userId) 
            // return () => socket.emit('unsubscribe_to_user_update', user.userId) 
        }
    },[socket, user])
}

export default useSubscribeToUserUpdate