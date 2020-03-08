import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { handleSignUp, handleLogin } from '../redux-store/actions/authedUser'

const SignUpLogin = () => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [avatarURL, setAvatarUrl] = useState('')
    const [password, setPassword] = useState('')
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [authedUser, setAuthedUser] = useState(localStorage.getItem('userId'))
    const dispatch = useDispatch()

    const SignUp = async (e) => {
        e.preventDefault()
        const user = {
            userId: username.toLowerCase(),
            firstName,
            lastName,
            avatarURL,
            password
        }
        await dispatch(handleSignUp(user))
        // console.log(localStorage.getItem('userId'))
        setAuthedUser(localStorage.getItem('userId'))
    }
    const Login = async (e) => {
        e.preventDefault()
        const user = {
            userId: loginUsername.toLowerCase(),
            password: loginPassword
        }
        await dispatch(handleLogin(user))
        setAuthedUser(localStorage.getItem('userId'))
    }

    if (authedUser) {
        return <Redirect to='/' />
    }
    return (
        <div className='form-container'>
            {console.log('rendering signup')}
            <form onSubmit={SignUp} className='form'>
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
                    <label htmlFor='avatarUrl'>Avatar URL</label>
                    <input 
                        value={avatarURL}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        type='text'
                    />
                </div>
                <button
                    type='submit'
                    disabled={username === '' || firstName === '' || lastName === '' || avatarURL === '' || password === ''}
                    className='btn'
                    >Sign Up
                </button>
            </form>
            <div className='separator-line'></div>
            <form onSubmit={Login} className='form'>
                <h3 className='form-header'>Log In </h3>
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
                    className='btn'
                >Log In
                </button>
            </form>
        </div>
    )
}

export default SignUpLogin