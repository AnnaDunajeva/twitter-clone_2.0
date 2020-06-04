import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import io from 'socket.io-client';
import {LOADED, URL_MAIN} from '../redux-store-2.0/constants'
import {setSocket} from '../redux-store-2.0/socket/actions'
import {getSocket} from '../redux-store-2.0/socket/selectors'
import {tweetUpdate, tweetDeleteExeptReplies} from '../redux-store-2.0/entities/tweets/actions'
import {userUpdate} from '../redux-store-2.0/entities/users/actions'
import usePageVisibility from './usePageVisibility'


const useSocketSetup = () => {
    const authedUser = useSelector(getAuthedUserId())
    const dispatch = useDispatch()
    const ispageVisible = usePageVisibility()
    const socket = useSelector(getSocket())
    
    useEffect(()=>{
        if (authedUser && ispageVisible && !socket) {//need this otherwise it wont rerun after user loagout and login again cause app didn unmount. 
                        //Also cant put into login component cause then socket wont be open on page refresh
            const socket = io(URL_MAIN, {path: '/api/socket.io'})
            socket.on('connect', () => {
                dispatch(setSocket(socket))
            })
            socket.on('tweet_update', ({tweetId, tweet}) => {
                dispatch(tweetUpdate(tweetId, tweet, LOADED))
                if (tweet[tweetId].deleted) {
                    //only visible tweet will be updated, which is a problem cause you will miss updates for tweets that are currently not in view
                    dispatch(tweetDeleteExeptReplies(tweetId)) 
                }
            })
            socket.on('user_update', ({userId, user}) => {
                dispatch(userUpdate(userId, user, LOADED))
            })
        } 
        else if (socket && !ispageVisible) {
            socket.close()
        }
    },[dispatch, authedUser, ispageVisible, socket])
}

export default useSocketSetup



