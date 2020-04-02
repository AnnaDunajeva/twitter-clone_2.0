import React, {useEffect} from 'react'
import {verifyAccount} from '../redux-store-2.0/api/session'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getSessionStartError} from '../redux-store-2.0/errors/selectors'

const EmailConfirmation = (props) => {    
    // const authedUser = useSelector(getAuthedUserId())
    const token = props.match.params.token
    const dispatch = useDispatch()
    const loginError = useSelector(getSessionStartError())
    
    useEffect(() => {
            dispatch(verifyAccount(token))
    }, [dispatch, token])

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


