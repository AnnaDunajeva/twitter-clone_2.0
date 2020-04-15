import React from 'react'
import {Redirect} from 'react-router-dom'
import {getUserIdFromCookie} from '../../utils/helpers'
import LoginBar from './mainNav/LoginBar'

const NotFound = () => {
    const authedUser = getUserIdFromCookie()

    if (!authedUser) {
        return <Redirect to='/login'/>
    }
    return (
        <React.Fragment>
            {authedUser
                ? null
                : <LoginBar/>
            }
            <div className='header'>Sorry, that page doesn’t exist!</div>
        </React.Fragment>
    )
}

export default NotFound