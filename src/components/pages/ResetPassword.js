import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {PASSWORD_RESET} from '../../redux-store-2.0/constants'
import {resetPassword} from '../../redux-store-2.0/api/session'
import {getSessionFetchStatus} from '../../redux-store-2.0/session/selectors'

const ResetPassword = (props) => {    
    const token = props.match.params.token
    const dispatch = useDispatch()
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
            <div className='reset-password-form-container'>
                <form onSubmit={handleResetPassword}>
                    <h3 className='header'>Enter your new password </h3>
                    <div className='alert-input-container'>
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
                        style={{margin: '35px auto', width: '250px', display: 'block'}}
                        className='btn btn-form'
                    >RESET PASSWORD
                    </button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default ResetPassword


