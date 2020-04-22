import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Route, Switch, Redirect } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import {getUser} from '../redux-store-2.0/api/users'
import {getAuthedUserProfile} from '../redux-store-2.0/entities/users/selectors'
import useSocketSetup from '../Hooks/useSocketSetup'
import useScrollToTopOnRouteChange from '../Hooks/useScrollToTopOnROuteChange'
import useLogoutOnAuthenticationError from '../Hooks/useLogOutOnAuthenticationError'
import {getUserIdFromCookie} from '../utils/helpers'
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
import ToBeImplemented from './utils/ToBeImplemented'
import {ThemeProvider} from 'styled-components'
import {light, dark} from './styles/themes'
import GlobalStyle from './styles/GlobalStyle'

const App = () => {
    const authedUser = getUserIdFromCookie()
    const dispatch = useDispatch()
    const userProfile = useSelector(getAuthedUserProfile())
    const [theme, setTheme] = useState(localStorage.getItem('theme'))

    useLogoutOnAuthenticationError()

    useScrollToTopOnRouteChange()

    useSocketSetup()

    useEffect(() => {
        if (authedUser) {
            console.log('fetching user profile')
            dispatch(getUser({
                user: {
                    userId: authedUser
                },
                userId: authedUser
            }))
        }
    }, [authedUser, dispatch])

    const toggleTheme = (e) => {
        e.preventDefault()
        if (theme === 'dark') {
            localStorage.setItem('theme', 'light')
            setTheme('light')
        } else {
            localStorage.setItem('theme', 'dark')
            setTheme('dark')
        }
    }
        
    return (
        <ThemeProvider theme={theme === 'dark' ? dark : light}>
        <GlobalStyle />
        {console.log('rendering app', !!authedUser, ' userProfile: ', userProfile)}
            <LoadingBar/>
            <GlobalErrors />
            <GlobalAlerts />

            <div className={authedUser ? 'app-container' : null}>
                <React.Fragment>
                    {authedUser && <NavBar toggleTheme={toggleTheme} theme={theme}/>}
                    <Switch>
                        <PrivateRoute path='/' exact component={Home}/>
                        <Route path='/login' component={SignUpLogin}/> 
                        <Route path='/verify/:token' component={EmailConfirmation}/>
                        <Route path='/resetPassword/:token' component={ResetPassword}/>
                        <PrivateRoute path='/tweet/:id' component={TweetPage}/>
                        <PrivateRoute path='/user/:userId' component={Profile}/>
                        <PrivateRoute path='/profile/update' component={ProfileUpdate}/>
                        <PrivateRoute path='/users' component={Users}/>
                        <PrivateRoute path='/find/:userId' component={SearchResults}/>
                        <Route component={NotFound} />
                    </Switch>
                    <ToTopButton />
                </React.Fragment>
            </div>
        </ThemeProvider>
    )
}

export default App