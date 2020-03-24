import {getSocket} from '../redux-store-2.0/socket/selectors'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'

const useSubscribeToTweetUpdate = (tweet) => {
    const socket = useSelector(getSocket())

    //also would be nice to subscribe to parent update, cause it might for example get deleted

    useEffect(()=>{
        if(tweet && !tweet.deleted && socket) {
            console.log('about to subscribe to tweet update ', tweet.id, )
            socket.emit('subscribe_to_tweet_update', tweet.id) 
            return () => socket.emit('unsubscribe_to_tweet_update', tweet.id) 
        }
    },[socket, tweet])
}

export default useSubscribeToTweetUpdate