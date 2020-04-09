import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import io from 'socket.io-client';
import {URL, LOADED} from '../redux-store-2.0/constants'
import {setSocket} from '../redux-store-2.0/socket/actions'
import {tweetUpdate, tweetDeleteExeptReplies} from '../redux-store-2.0/entities/tweets/actions'
import {userUpdate} from '../redux-store-2.0/entities/users/actions'

const useSocketSetup = () => {
    const authedUser = useSelector(getAuthedUserId())
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if (authedUser) {//need this otherwise it wont rerun after user loagout and login again cause app didn unmount. 
                        //Also cant put into login component cause then socket wont be open on page refresh
            const socket = io('http://localhost', {path: '/api/socket.io'})
            socket.on('connect', () => {
                console.log('socket created and connected to server!')
                dispatch(setSocket(socket))
            })
            socket.on('tweet_update', ({tweetId, tweet}) => {
                console.log('got tweet update through socket ', tweet)
                dispatch(tweetUpdate(tweetId, tweet, LOADED))
                if (tweet[tweetId].deleted) {
                    //only visible tweet will be updated, which is a problem cause you will miss updates for tweets that are currently not in view
                    setTimeout(() => dispatch(tweetDeleteExeptReplies(tweetId)), 5000) //dunno if i should clearTiomeout anywhere cause i want this tweet deleted in any cause even if component unmounts or smth
                    // dispatch(tweetDelete(tweetId))
                }
            })
            socket.on('user_update', ({userId, user}) => {
                console.log('got user update through socket ', user)
                dispatch(userUpdate(userId, user, LOADED))
            })
            // socket.on('connect_error', (err) => {
                //problem: when serves running again, new socket will be created and i will have to resubscribe everything
            //     console.log('connection error in socket: ', err)
            //     socket.close()
            // })
        }
    },[dispatch, authedUser])
}

export default useSocketSetup