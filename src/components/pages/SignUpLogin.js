import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import {signUp, login} from '../../redux-store-2.0/api/session'
import {validateEmail, getUserIdFromCookie, isValidFisrtOrLastname, isValidUsername} from '../../utils/helpers'
import Alert from '../modals/Alert'
import RequestResetPasswordLinkAlert from '../modals/RequestResetPasswordLinkAlert'
import MainButton from '../styles/MainButton'
import ClearButton from '../styles/ClearButton'
import Link from '../styles/Link'
import Form from '../styles/Form'
import {light, dark} from '../styles/themes'
import AnimatedGradient from '../styles/AnimatedGradient'

const SignUpLogin = () => {
    const authedUser = getUserIdFromCookie()
    const dispatch = useDispatch()

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

        if (!isValidUsername(username)) {
            setFormError('You can only use in your username alphabetic characters, numbers, "-" or "_".')
            return
        }
        if (!isValidFisrtOrLastname(firstName)) {
            setFormError('You can only use alphabetic characters and "-" in your name.')
            return
        }
        if (!isValidFisrtOrLastname(lastName)) {
            setFormError('You can only use alphabetic characters and "-" in your name.')
            return
        }

        if (!validateEmail(email)) {
            setFormError('Provided email adress is invalid!')
            return
        }
        if (password.length < 6) {
            setFormError('Password should be at least 6 characters long.')
            return
        }

        const user = {
            userId: username.toLowerCase().trim(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            password: password,
            email: email.trim()
        }

        await dispatch(signUp(user))
    }

    const LoginUser = async (e) => {
        e.preventDefault()
        const user = {
            userId: loginUsername.toLowerCase().trim(),
            password: loginPassword
        }
        if (loginUsername.length !== 0 && loginPassword.length !== 0) {
            await dispatch(login(user))
        }
    }

    if (authedUser) {
        return <Redirect to='/' />
    }
    //in case if email confirmation error will be redirected here with login error
    return (
        <ThemeProvider theme={dark}>
            <AnimatedGradient>
                <div className='form-container'>
                    {console.log('rendering signup')}

                    {forgotPassword && 
                        <RequestResetPasswordLinkAlert onClose={() => setForgotPassword(false)}/>}
                
                    {formError && <Alert message={formError} onClose={() => setFormError(null)}/>}

                    <Form onSubmit={LoginUser} noInputBorder shadow inputShadow={'mediumDarkShadow'} labelColor={'mediumLightGrey'}>
                        <h3>Login </h3>
                            <div>
                            <label htmlFor='loginUsername'>Username</label>
                            <input 
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                                type='text'/>
                            <label htmlFor='loginPassword'>Password</label>
                            <input 
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                type='password'/>
                        </div>
                        <MainButton
                            mediumSmall blue disabledMediumLight shadow={'darkShadow'} uppercase margin={'20px auto'}
                            type='submit'
                            disabled={loginUsername === '' || loginPassword === ''}>
                                Login
                        </MainButton>
                        <Link onClick={()=>setForgotPassword(true)}>
                            Forgot password?
                        </Link>
                    </Form>

                    <div className='separator-line'></div>

                    <Form onSubmit={SignUpUser} noInputBorder inputWidth={'300px'} shadow inputShadow={'mediumDarkShadow'} labelColor={'mediumLightGrey'}>
                        <h3>Sign Up to communicate with the World!</h3>
                        <div>
                            <label htmlFor='username'>Username</label>
                            <input 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type='text'/>
                            <label htmlFor='firstName'>First Name</label>
                            <input 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                type='text'/>
                            <label htmlFor='lastName'>Last Name</label>
                            <input 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                type='text'/>
                            <label htmlFor='password'>Password</label>
                            <input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'/>
                            <label htmlFor='email'>e-mail</label>
                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type='text'/>
                        </div>
                        <MainButton
                            mediumSmall blue disabledMediumLight shadow={'darkShadow'} uppercase margin={'10px auto'}
                            type='submit'
                            disabled={username === '' || firstName === '' || lastName === '' || password === '' || email === ''}>
                                Sign Up
                        </MainButton>
                    </Form>
                </div>
            </AnimatedGradient>
        </ThemeProvider>
    )
}

export default SignUpLogin