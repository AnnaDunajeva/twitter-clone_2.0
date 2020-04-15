import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Route, Switch, Redirect } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import {getUser} from '../redux-store-2.0/api/users'
import {getAuthedUserProfile} from '../redux-store-2.0/entities/users/selectors'
import useSocketSetup from '../Hooks/useSocketSetup'
import useScrollToTopOnRouteChange from '../Hooks/useScrollToTopOnROuteChange'
import useLogoutOnAuthenticationError from '../Hooks/useLogOutOnAuthenticationError'
import {getUserIdFromCookie} from '../utils/helpers'
import NewTweet from './entities/NewTweet'
import PrivateRoute from './utils/PrivateRoute'
import Home from './pages/Home'
import NavBar from './pages/mainNav/NavBar'
import Users from './pages/Users'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import TweetPage from './pages/TweetPage'
import SignUpLogin from './pages/SignUpLogin'
import EmailConfirmation from './pages/EmailConfirmation'
import ProfileUpdate from './pages/ProfileUpdate'
import ResetPassword from './pages/ResetPassword'
import GlobalErrors from './utils/GlobalErrors'
import GlobalAlerts from './utils/GlobalAlerts'
import ToTopButton from './utils/ToTopButton'
import SearchResults from './pages/SearchResults'

const App = () => {
    const authedUser = getUserIdFromCookie()
    const dispatch = useDispatch()
    const userProfile = useSelector(getAuthedUserProfile())

    useLogoutOnAuthenticationError()

    useScrollToTopOnRouteChange()

    useSocketSetup()

    useEffect(() => {
        // console.log(match)
        if (authedUser) {
        // if (!userProfile?.userId && match.path !== '/login' && match.path !== '/verify/:token' && match.path !=='/resetPassword/:token' && sessionStatus !== LOADING && sessionStatus !== LOADED && !sessionError ){
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
                                <PrivateRoute path='/profile/update' component={ProfileUpdate}/>
                                <PrivateRoute path='/users' component={Users}/>
                                <PrivateRoute path='/find/:userId' component={SearchResults}/>
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