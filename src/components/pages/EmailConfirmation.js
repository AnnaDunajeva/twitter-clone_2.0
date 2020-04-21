import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {verifyAccount} from '../../redux-store-2.0/api/session'
import {getSessionStartError} from '../../redux-store-2.0/errors/selectors'
import {getUserIdFromCookie} from '../../utils/helpers'

const EmailConfirmation = (props) => {    
    const token = props.match.params.token
    const dispatch = useDispatch()
    const loginError = useSelector(getSessionStartError())
    const authedUserId = getUserIdFromCookie()

    useEffect(() => {
        if (!authedUserId) {
            dispatch(verifyAccount(token))
        }
    }, [dispatch, token, authedUserId])
    
    if (authedUserId) {
        return <Redirect to='/'/>
    }

    if (loginError) { //login should display error message after redirect
        return <Redirect to='/login'/>
    }

    return (
        <React.Fragment>
            {console.log('rendering email verification')}
            <div className='header' style={{marginTop: '50px'}}>
                We are confirming your email account...
            </div>
            <div className='header-small'>
                It will take just a second. 
                You will be redirected to your account shortly.
            </div>
        </React.Fragment>
    )
}

export default EmailConfirmation


