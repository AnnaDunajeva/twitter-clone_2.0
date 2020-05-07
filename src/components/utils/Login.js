import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {ThemeProvider} from 'styled-components'
import {login} from '../../redux-store-2.0/api/session'
// import RequestResetPasswordLinkAlert from '../modals/RequestResetPasswordLinkAlert'
import MainButton from '../styles/MainButton'
import Link from '../styles/Link'
import Form from '../styles/Form'
import {light, dark} from '../styles/themes'
import {isValidUsername} from '../../utils/helpers'

const Login = ({showForgotPassword, setFormError}) => {
    const dispatch = useDispatch()
    const [forgotPassword, setForgotPassword] = useState(false)

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
        <Form onSubmit={LoginUser} shadow labelColor={'mediumLightGrey'}  padding={'0 40px 20px 40px'}>
            <h3>Login </h3>
                <div>
                <label htmlFor='loginUsername'>Username</label>
                <input 
                    value={loginUsername}
                    maxLength={30}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    type='text'/>
                <label htmlFor='loginPassword'>Password</label>
                <input 
                    value={loginPassword}
                    maxLength={50}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    type='password'/>
            </div>
            <ThemeProvider theme={light}>
                <MainButton
                    mediumSmall blue disabledMediumLight shadow uppercase margin={'20px auto'}
                    type='submit'
                    disabled={loginUsername === '' || loginPassword === ''}>
                        Login
                </MainButton>
            </ThemeProvider>
            <Link onClick={()=>showForgotPassword(true)}>
                Forgot password?
            </Link>
        </Form>
    )
}

export default Login