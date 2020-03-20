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

const App = () => {
    const authedUser = useSelector(getAuthedUserId())
    const dispatch = useDispatch()
    
    useScrollToTopOnRouteChange()

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
    //fetch user profile
    
    return (
        <React.Fragment>
                {console.log('rendering app', authedUser)}
                <LoadingBar/>
                <div className={authedUser ? 'app-container' : null}>
                    {authedUser 
                        ? <NavBar/> 
                        : null
                    }
                    {authedUser && <Alert message={'Welcome to the coolest twitter clone out there!!! Hope you find tons of great content here <3'}/>}
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