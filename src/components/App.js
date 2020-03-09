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
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import ProfileUpdate from './ProfileUpdate'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import {getUser} from '../redux-store-2.0/api/users'

const App = () => {
    const authedUser = useSelector(getAuthedUserId())
    const dispatch = useDispatch()

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
        <Router>
            <React.Fragment>
                {console.log('rendering app', authedUser)}
                <LoadingBar/>
                <div className='app-container'>
                    {authedUser 
                        ? <NavBar/> 
                        : null
                    }
                    <div>
                    <Switch>
                        <PrivateRoute path='/' exact component={Home}/>
                        <Route path='/login' component={SignUpLogin}/>
                        <PrivateRoute path='/newtweet' component={NewTweet}/>
                        <PrivateRoute path='/tweet/:id' component={TweetPage}/>
                        <PrivateRoute path='/user/:userId' exact component={Profile}/>
                        <PrivateRoute path={`/user/${authedUser}/update`} component={ProfileUpdate}/>
                        <PrivateRoute path='/users' component={Users}/>
                        <Route component={NotFound} />
                    </Switch>
                    </div>
                </div>
            </React.Fragment>
        </Router>
    )
}

export default App