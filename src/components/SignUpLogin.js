import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {signUp, login} from '../redux-store-2.0/api/session'
import {getSessionStartError, getSignUpError, getResetPasswordLinkError} from '../redux-store-2.0/errors/selectors'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import Alert from './Alert'
import {validateEmail} from '../utils/helpers'
import {getSessionFetchStatus} from '../redux-store-2.0/session/selectors'
import {SIGN_UP, PASSWORD_RESET_LINK_SENT} from '../redux-store-2.0/constants'
import RequestResetPasswordLinkAlert from './RequestResetPasswordLinkAlert'
import {RESET_PASSWORD_LINK_ERROR, SET_SESSION_FETCHSTATUS} from '../redux-store-2.0/action-types'
import {globalErrorRemove} from '../redux-store-2.0/errors/actions'
import {setSessionFetchStatus} from '../redux-store-2.0/session/actions'
import {getUserIdFromCookie} from '../utils/helpers'

const SignUpLogin = () => {
    const authedUser = getUserIdFromCookie()
    const dispatch = useDispatch()
    const loginError = useSelector(getSessionStartError())
    const signUpError = useSelector(getSignUpError())
    // const authedUser = useSelector(getAuthedUserId())
    const sessionStatus = useSelector(getSessionFetchStatus()) 
    const resetPasswordLinkError = useSelector(getResetPasswordLinkError())

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState(null)

    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [forgotPassword, setForgotPassword] = useState(false)

    const SignUpUser = async (e) => {
        e.preventDefault()

        if (!validateEmail(email)) {
            setFormError('Provided email adress is invalid!')
            return
        }

        const user = {
            userId: username.toLowerCase(),
            firstName,
            lastName,
            password,
            email
        }

        await dispatch(signUp(user))
    }

    const LoginUser = async (e) => {
        e.preventDefault()
        const user = {
            userId: loginUsername.toLowerCase(),
            password: loginPassword
        }
        await dispatch(login(user))
    }
    const handleCloseResetPsswordLinkErrorAlert = () => {
        dispatch(globalErrorRemove(RESET_PASSWORD_LINK_ERROR))
    }

    if (authedUser) {
        return <Redirect to='/' />
    }
    //in case if email confirmation error will be redirected here with login error
    return (
        <div className='animated-gradient'>
            <div className='form-container'>
                {console.log('rendering signup')}

                {forgotPassword && 
                    <RequestResetPasswordLinkAlert onClose={() => setForgotPassword(false)}/>}
                {/* {sessionStatus === SIGN_UP && <Alert message={'Thank you! Please confirm your email adress to continue.'} 
                                                    smallMessage={'NB! confirmation link is valid for 15 min. If you do not confirm your account during 24 hours, it will be deleted. You can request new confirmation link if needed.'}/>}
                {sessionStatus === PASSWORD_RESET_LINK_SENT && 
                    <Alert message={'We have sent reset password link to your email adress.'}
                            smallMessage={'NB! Link is valid for 15 minutes. If you do not reset your password during this period, your old password will remain valid.'}
                            onClose={()=>dispatch(setSessionFetchStatus(null))}/>} */}
                {/* {loginError && <Alert message={loginError}/>} 
                {signUpError && <Alert message={signUpError}/>}
                {resetPasswordLinkError && <Alert message={resetPasswordLinkError} onClose={handleCloseResetPsswordLinkErrorAlert}/>} */}
                {formError && <Alert message={formError} onClose={() => setFormError(null)}/>}

                <form onSubmit={LoginUser} className='form'>
                    <h3 className='form-header'>Login </h3>
                    <div className='inputs-container'>
                        <label htmlFor='loginUsername'>Username</label>
                        <input 
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                            type='text'
                        />
                        <label htmlFor='loginPassword'>Password</label>
                        <input 
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            type='password'
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={loginUsername === '' || loginPassword === ''}
                        className='btn btn-form'
                    >Login
                    </button>
                    <div 
                        className='clickable hover-blue-circle-background' 
                        onClick={()=>setForgotPassword(true)}
                        style={{marginTop: '10px', width: '160px', textAlign: 'center'}} 
                        tabIndex={0}>
                            Forgot password?
                    </div>
                </form>
                <div className='separator-line'></div>
                <form onSubmit={SignUpUser} className='form'>
                    <h3 className='form-header'>Sign Up to communicate with the World!</h3>
                    <div className='inputs-container'>
                        <label htmlFor='username'>Username</label>
                        <input 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type='text'
                        />
                        <label htmlFor='firstName'>First Name</label>
                        <input 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type='text'
                        />
                        <label htmlFor='lastName'>Last Name</label>
                        <input 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type='text'
                        />
                        <label htmlFor='password'>Password</label>
                        <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                        />
                        <label htmlFor='email'>e-mail</label>
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='text'
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={username === '' || firstName === '' || lastName === '' || password === '' || email === ''}
                        className='btn btn-form'
                        >Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUpLogin