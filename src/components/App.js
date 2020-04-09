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
import {Route, Switch, Redirect } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import ProfileUpdate from './ProfileUpdate'
import {getAuthedUserId, getSessionFetchStatus} from '../redux-store-2.0/session/selectors'
import {getUser} from '../redux-store-2.0/api/users'
// import Alert from './Alert'
import useScrollToTopOnRouteChange from '../Hooks/useScrollToTopOnROuteChange'
import ToTopButton from './ToTopButton'
// import io from 'socket.io-client';
// import {URL, LOADED, SIGN_UP, PASSWORD_RESET} from '../redux-store-2.0/constants'
import {SESSION_END_SUCCESS} from '../redux-store-2.0/action-types'
// import {setSocket} from '../redux-store-2.0/socket/actions'
// import {tweetUpdate, tweetDeleteExeptReplies} from '../redux-store-2.0/entities/tweets/actions'
// import {userUpdate} from '../redux-store-2.0/entities/users/actions'
import {getAuthedUserProfile} from '../redux-store-2.0/entities/users/selectors'
import EmailConfirmation from './EmailConfirmation'
import ResetPassword from './ResetPassword'
import {isAuthenticationError} from '../redux-store-2.0/errors/selectors'
import GlobalErrors from './GlobalErrors'
import GlobalAlerts from './GlobalAlerts'
import useSocketSetup from '../Hooks/useSocketSetup'
import useLogoutOnAuthenticationError from '../Hooks/useLogOutOnAuthenticationError'

const App = () => {
    const authedUser = useSelector(getAuthedUserId())
    const dispatch = useDispatch()
    const userProfile = useSelector(getAuthedUserProfile())
    // const sessionStatus = useSelector(getSessionFetchStatus())
    const authenticationError = useSelector(isAuthenticationError())
    
    useLogoutOnAuthenticationError()

    useScrollToTopOnRouteChange()

    useSocketSetup()

    // useEffect(() => {
    //     if (authenticationError) {
    //         console.log('authenticationError')
            
    //         localStorage.removeItem('userId')
    //         localStorage.removeItem('token')

    //         dispatch({type: SESSION_END_SUCCESS})
    //     }
    // }, [authenticationError, dispatch])

    useEffect(() => {
        if (authedUser) {
        console.log('fetching user profile')
            dispatch(getUser({
                user: {
                    userId: authedUser,
                    // token: localStorage.getItem('token')
                },
                userId: authedUser
            }))
        }
    }, [authedUser, dispatch])
    
    //do i even need private route if i render router only when i get user profile?
    
    return (
        <React.Fragment>
                {console.log('rendering app', authedUser, ' userProfile: ', userProfile)}
                <LoadingBar/>
                <GlobalErrors />
                <GlobalAlerts />
                {!authedUser && 
                    <Switch>
                        <Route path='/login' component={SignUpLogin}/>
                        <Route path='/verify/:token' component={EmailConfirmation}/>
                        <Route path='/resetPassword/:token' component={ResetPassword}/>
                        <Route component={NotFound} />
                    </Switch>
                }
                <div className={authedUser ? 'app-container' : null}>
                    {userProfile && //checking for user profile inside private route causes infinite rerender
                        <React.Fragment>
                            <NavBar/> 
                            <Switch>
                                <PrivateRoute path='/' exact component={Home}/>
                                <Route path='/login' component={SignUpLogin}/> 
                                <PrivateRoute path='/newtweet' component={NewTweet}/>
                                <PrivateRoute path='/tweet/:id' component={TweetPage}/>
                                <PrivateRoute path='/user/:userId' component={Profile}/>
                                <PrivateRoute path={`/profile/update`} component={ProfileUpdate}/>
                                <PrivateRoute path='/users' component={Users}/>
                                <Redirect from='/verify/:token' to='/' />
                                <Route component={NotFound} />
                            </Switch>
                            <ToTopButton />
                            {/* {sessionStatus === LOADED+''+SIGN_UP && <Alert message={'Welcome to the coolest twitter clone out there!!!'} smallMessage={'We hope you find tons of great content here <3'}/>} */}
                        </React.Fragment>
                    }
                </div>
                {/* {sessionStatus === PASSWORD_RESET && <Alert message={'Your password has been reset!'} smallMessage={'Please login to continue to your account.'}/>} */}
        </React.Fragment>
    )
}

export default App