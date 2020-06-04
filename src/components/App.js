import React from 'react'
import { useSelector } from 'react-redux'
import {Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import { getAuthedUserProfile } from '../redux-store-2.0/entities/users/selectors'
import useSocketSetup from '../Hooks/useSocketSetup'
import useScrollToTopOnRouteChange from '../Hooks/useScrollToTopOnROuteChange'
import useSubscribeToUserUpdate from '../Hooks/useSubscribeToUserUpdate'
import useLogoutOnAuthenticationError from '../Hooks/useLogOutOnAuthenticationError'
import useToggleTheme from '../Hooks/useToggleTheme'
import useFetchUserProfile from '../Hooks/useFetchUserProfile'
import { getAuthedUserId } from '../redux-store-2.0/session/selectors'
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
import { ThemeProvider } from 'styled-components'
import { light, dark } from './styles/themes'
import GlobalStyle from './styles/GlobalStyle'
import AppContainer from './styles/AppContainer'

const App = () => {
    const authedUser = useSelector(getAuthedUserId())
    const userProfile = useSelector(getAuthedUserProfile())
    const {theme, toggleTheme} = useToggleTheme()
    
    useFetchUserProfile({userId: authedUser})

    useSocketSetup()

    useSubscribeToUserUpdate(userProfile)
    
    useLogoutOnAuthenticationError()

    useScrollToTopOnRouteChange()
        
    return (
        <ThemeProvider theme={theme === 'dark' ? dark : light}>
            <GlobalStyle />
            <LoadingBar/>
            <GlobalErrors />
            <GlobalAlerts />

            <AppContainer logged={authedUser ? true : false} data-test='component-app'>
                {authedUser && 
                <NavBar toggleTheme={toggleTheme} theme={theme}/>}
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
            </AppContainer>
            <ToTopButton />
        </ThemeProvider>
    )
}

export default App