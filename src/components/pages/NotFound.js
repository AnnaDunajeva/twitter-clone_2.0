import React from 'react'
import {Redirect} from 'react-router-dom'
import {getUserIdFromCookie} from '../../utils/helpers'

const NotFound = () => {
    const authedUser = getUserIdFromCookie()

    if (!authedUser) {
        return <Redirect to='/login'/>
    }
    return (
        <React.Fragment>
            <h3>Sorry, that page doesn’t exist!</h3>
        </React.Fragment>
    )
}

export default NotFound