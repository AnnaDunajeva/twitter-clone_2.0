import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {signUp, login} from '../redux-store-2.0/api/session'
import {getSessionStartError} from '../redux-store-2.0/errors/selectors'
import Alert from './Alert'

// import {getAuthedUserId} from '../redux-store-2.0/session/selectors'

const SignUpLogin = () => {
    const loginError = useSelector(getSessionStartError())
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    // const [avatarURL, setAvatarUrl] = useState('')
    const [password, setPassword] = useState('')

    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [authedUser, setAuthedUser] = useState(localStorage.getItem('userId'))

    const dispatch = useDispatch()

    const SignUpUser = async (e) => {
        e.preventDefault()
        const user = {
            userId: username.toLowerCase(),
            firstName,
            lastName,
            // avatarURL,
            password,
            email
        }
        await dispatch(signUp(user))

        setAuthedUser(localStorage.getItem('userId'))
    }
    const LoginUser = async (e) => {
        e.preventDefault()
        const user = {
            userId: loginUsername.toLowerCase(),
            password: loginPassword
        }
        await dispatch(login(user))
        setAuthedUser(localStorage.getItem('userId'))
    }

    if (authedUser) {
        return <Redirect to='/' />
    }
    return (
        <div className='animated-gradient'>
            <div className='form-container'>
                {console.log('rendering signup')}
                {loginError && <Alert message={loginError}/>}
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
                        {/* <label htmlFor='avatarUrl'>Avatar URL</label>
                        <input 
                            value={avatarURL}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            type='text'
                        /> */}
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