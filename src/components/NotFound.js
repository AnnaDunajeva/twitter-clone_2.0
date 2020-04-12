import React from 'react'
import LoginBar from './LoginBar'
import {useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import {getUserIdFromCookie} from '../utils/helpers'

const NotFound = () => {
    // const authedUser = useSelector(getAuthedUserId())
    const authedUser = getUserIdFromCookie()

    if (!authedUser) {
        return <Redirect to='/login'/>
    }
    return (
        <React.Fragment>
            {localStorage.getItem('userId')
                ? null
                : <LoginBar/>
            }
            <div className='header'>Sorry, that page doesn’t exist!</div>
        </React.Fragment>
    )
}

export default NotFound