import React from 'react'
import {useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
// import {getUserIdFromCookie} from '../../utils/helpers'
import {getAuthedUserId} from '../../redux-store-2.0/session/selectors'

const NotFound = () => {
    const authedUser = useSelector(getAuthedUserId())

    if (!authedUser) {
        return <Redirect to='/login'/>
    }
    return (
        <React.Fragment>
            <h3 data-test='component-notfound'>Sorry, that page doesn’t exist!</h3>
        </React.Fragment>
    )
}

export default NotFound