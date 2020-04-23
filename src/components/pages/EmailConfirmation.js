import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {verifyAccount} from '../../redux-store-2.0/api/session'
import {getSessionStartError} from '../../redux-store-2.0/errors/selectors'
import {getUserIdFromCookie} from '../../utils/helpers'
import EntityBackgroundContainer from '../styles/EntityBackgroundContainer'

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
        <EntityBackgroundContainer margin={'50px auto'}>
            {console.log('rendering email verification')}
            <h3>
                We are confirming your email account...
            </h3>
            <p>
                It will take just a second. 
            </p>
            <p>
                You will be redirected to your account shortly.
            </p>
        </EntityBackgroundContainer>
    )
}

export default EmailConfirmation


