import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {ThemeProvider} from 'styled-components'
import {login} from '../../redux-store-2.0/api/session'
import GoogleSigninButton from './GoogleSigninButton'
import MainButton from '../styles/MainButton'
import Link from '../styles/Link'
import Form from '../styles/Form'
import {light} from '../styles/themes'
import {isValidUsername} from '../../utils/helpers'

const Login = ({showForgotPassword, setFormError}) => {
    const dispatch = useDispatch()

    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const LoginUser = async (e) => {
        e.preventDefault()
        if (!isValidUsername(loginUsername)) {
            setFormError('Invalid input!')
            return
        }
        const user = {
            userId: loginUsername.toLowerCase().trim(),
            password: loginPassword
        }
        if (loginUsername.length !== 0 && loginPassword.length !== 0) {
            await dispatch(login(user))
        }
    }

    return (
        <Form 
            data-test="component-login"
            onSubmit={LoginUser} 
            shadow labelColor={'mediumLightGrey'}  padding={'0 40px 20px 40px'}>
            <h3>Login </h3>
                <div>
                {/* <label htmlFor='loginUsername'>Username</label> */}
                <input 
                    data-test="input-username"
                    placeholder='username'
                    value={loginUsername}
                    maxLength={30}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    type='text'/>
                {/* <label htmlFor='loginPassword'>Password</label> */}
                <input 
                    data-test="input-password"
                    placeholder='password'
                    value={loginPassword}
                    maxLength={50}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    type='password'/>
            </div>
            <ThemeProvider theme={light}>
                <MainButton
                    data-test='button-login'
                    mediumSmall blue disabledMediumLight shadow margin={'20px auto 10px auto'}  padding={'12px 15px'}
                    type='submit'
                    disabled={loginUsername === '' || loginPassword === ''}>
                        Login
                </MainButton>
            </ThemeProvider>
            <p>OR</p>
            <GoogleSigninButton/>
            <Link 
                data-test='link-forgot-password'
                onClick={()=>showForgotPassword(true)}>
                Forgot password?
            </Link>
        </Form>
    )
}

export default Login