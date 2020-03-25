import {getSocket} from '../redux-store-2.0/socket/selectors'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {getAllTweetsIds} from '../redux-store-2.0/entities/tweets/selectors'

const useSubscribeAllTweetsToUpdate = () => {
    const socket = useSelector(getSocket())
    const allTweetIds = useSelector(getAllTweetsIds)
    const [initialSubscribe, setInitialSubscribe] = useState(false)

    useEffect(()=>{
        if(allTweetIds && socket && !initialSubscribe) {
            console.log('about to subscribe all tweets to tweet updates ', allTweetIds.length, )
            allTweetIds.forEach(tweetId => {
                socket.emit('subscribe_to_tweet_update', tweetId) 
            })
            setInitialSubscribe(true) //wont work with logout cause app still mounted
        }
    },[socket, allTweetIds, initialSubscribe])

}

export default useSubscribeAllTweetsToUpdate