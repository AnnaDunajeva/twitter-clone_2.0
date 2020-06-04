import {getSocket} from '../redux-store-2.0/socket/selectors'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'

const useSubscribeToUserUpdate = (user) => {
    const socket = useSelector(getSocket())

    useEffect(()=>{
        if(user && !user.deleted && socket) {
            socket.emit('subscribe_to_user_update', user.userId) 
            // return () => socket.emit('unsubscribe_to_user_update', user.userId) 
            //we actually dont want to unsubscribe from updae when component unmount cause then 
            //when it will mount back we will miss some updates and data might be inconsistent
        }
    },[socket, user])
}

export default useSubscribeToUserUpdate