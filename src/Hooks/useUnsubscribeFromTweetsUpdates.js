import {getSocket} from '../redux-store-2.0/socket/selectors'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {getAllTweetsIds} from '../redux-store-2.0/entities/tweets/selectors'

const useUnsubscribeFromTweetsUpdates = () => {
    const socket = useSelector(getSocket())
    const tweetIds = useSelector(getAllTweetsIds())

    useEffect(() => {
        tweetIds.forEach((tweetId) => {
            socket.emit('unsubscribe_to_tweet_update', tweetId) 
        })
    }, [])
}

export default useUnsubscribeFromTweetsUpdates