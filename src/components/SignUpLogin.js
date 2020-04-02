import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {signUp, login} from '../redux-store-2.0/api/session'
import {getSessionStartError, getSignUpError} from '../redux-store-2.0/errors/selectors'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import Alert from './Alert'
import {validateEmail} from '../utils/helpers'
import {getSessionFetchStatus} from '../redux-store-2.0/session/selectors'
import {SIGN_UP} from '../redux-store-2.0/constants'

const SignUpLogin = () => {
    const dispatch = useDispatch()
    const loginError = useSelector(getSessionStartError())
    const signUpError = useSelector(getSignUpError())
    const authedUser = useSelector(getAuthedUserId())
    const sessionStatus = useSelector(getSessionFetchStatus()) 

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState(null)

    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

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

    if (authedUser) {
        return <Redirect to='/' />
    }
    //in case if email confirmation error will be redirected here with login error
    return (
        <div className='animated-gradient'>
            <div className='form-container'>
                {console.log('rendering signup')}
                {sessionStatus === SIGN_UP && <Alert message={'Thank you! Please confirm your email adress to continue.'} 
                                                    smallMessage={'NB! confirmation link is valid for 15 min. If you do not confirm your account during 24 hours, it will be deleted. You can request new confirmation link if needed.'}/>}
                {loginError && <Alert message={loginError}/>} 
                {signUpError && <Alert message={signUpError}/>}
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