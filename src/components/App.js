import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import NavBar from './NavBar'
import Home from './Home'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import SignUpLogin from './SignUpLogin'
import PrivateRoute from './PrivateRoute'
import Users from './Users'
import Profile from './Profile'
import NotFound from './NotFound'
import {Route, Switch} from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import ProfileUpdate from './ProfileUpdate'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import {getUser} from '../redux-store-2.0/api/users'
import Alert from './Alert'
import useScrollToTopOnRouteChange from '../Hooks/useScrollToTopOnROuteChange'
import ToTopButton from './ToTopButton'
import io from 'socket.io-client';
import {URL, LOADED} from '../redux-store-2.0/constants'
import {setSocket} from '../redux-store-2.0/socket/actions'
import {tweetUpdate, tweetDeleteExeptReplies} from '../redux-store-2.0/entities/tweets/actions'
import {userUpdate} from '../redux-store-2.0/entities/users/actions'

const App = () => {
    const authedUser = useSelector(getAuthedUserId())
    const dispatch = useDispatch()
    
    useScrollToTopOnRouteChange()

    useEffect(()=>{
        if (authedUser) {//need this otherwise it wont rerun after user loagout. 
                        //Also cant put into login component cause then socket wont be open on page refresh
            const socket = io(URL)
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

    useEffect(() => {
        if (authedUser) {
        console.log('fetching user profile')
            dispatch(getUser({
                user: {
                    userId: authedUser,
                    token: localStorage.getItem('token')
                },
                userId: authedUser
            }))
        }
    }, [authedUser, dispatch])
    
    //effect to unsubscribe from updates (when page refreshed), also nedd to be run from loagout
    
    return (
        <React.Fragment>
                {console.log('rendering app', authedUser)}
                <LoadingBar/>
                <div className={authedUser ? 'app-container' : null}>
                    {authedUser 
                        ? <NavBar/> 
                        : null
                    }
                    {/* {authedUser && <Alert message={'Welcome to the coolest twitter clone out there!!! Hope you find tons of great content here <3'}/>} */}
                    <div>
                        <Switch>
                            <PrivateRoute path='/' exact component={Home}/>
                            <Route path='/login' component={SignUpLogin}/>
                            <PrivateRoute path='/newtweet' component={NewTweet}/>
                            <PrivateRoute path='/tweet/:id' component={TweetPage}/>
                            <PrivateRoute path='/user/:userId' component={Profile}/>
                            <PrivateRoute path={`/profile/update`} component={ProfileUpdate}/>
                            <PrivateRoute path='/users' component={Users}/>
                            <Route component={NotFound} />
                        </Switch>
                        <ToTopButton />
                    </div>
                </div>
        </React.Fragment>
    )
}

export default App