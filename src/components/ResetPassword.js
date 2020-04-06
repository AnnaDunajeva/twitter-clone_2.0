import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, useHistory} from 'react-router-dom'
import Alert from './Alert'
import {PASSWORD_RESET_LINK_SENT, PASSWORD_RESET} from '../redux-store-2.0/constants'
import {resetPassword} from '../redux-store-2.0/api/session'
import {getResetPasswordError} from '../redux-store-2.0/errors/selectors'
import {getSessionFetchStatus} from '../redux-store-2.0/session/selectors'

const ResetPassword = (props) => {    
    // const authedUser = useSelector(getAuthedUserId())
    const token = props.match.params.token
    const dispatch = useDispatch()
    const history = useHistory()
    const resetPasswordError = useSelector(getResetPasswordError())
    const sessionStatus = useSelector(getSessionFetchStatus())

    const [password, setPassword] = useState('')
    
    const handleResetPassword = (e) => {
        e.preventDefault()
        dispatch(resetPassword({token, password}))
    }

    if (sessionStatus === PASSWORD_RESET) { //login should display reset password success message
        return <Redirect to='/login'/>
    }

    return (
        <React.Fragment>
            {console.log('rendering reset password')}
            {resetPasswordError && <Alert message={resetPasswordError} onClose={() => history.push('/')}/> }
            <form onSubmit={handleResetPassword}>
                <h3 className='header'>Enter your new password </h3>
                <div className='inputs-container'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                    />
                </div>
                <button
                    type='submit'
                    disabled={password === ''}
                    className='btn btn-form'
                >RESET PASSWORD
                </button>
            </form>
        </React.Fragment>
    )
}

export default ResetPassword


