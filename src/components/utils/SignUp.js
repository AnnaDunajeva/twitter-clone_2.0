import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {ThemeProvider} from 'styled-components'
import GoogleSigninButton from './GoogleSigninButton'
import {signUp} from '../../redux-store-2.0/api/session'
import {validateEmail, isValidFisrtOrLastname, isValidUsername} from '../../utils/helpers'
import MainButton from '../styles/MainButton'
import Form from '../styles/Form'
import {light} from '../styles/themes'
import Link from '../styles/Link'

const SignUp = ({setFormError, showRequestAccountVerificationLink}) => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const SignUpUser = async (e) => {
        e.preventDefault()

        if (!isValidUsername(username)) {
            setFormError('You can only use in your username alphabetic characters, numbers, "-" or "_".')
            return
        }
        if (!isValidFisrtOrLastname(firstName)) {
            setFormError('You can only use alphabetic characters, space and "-" in your name.')
            return
        }
        if (!isValidFisrtOrLastname(lastName)) {
            setFormError('You can only use alphabetic characters, space and "-" in your name.')
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

    return (
        <Form 
            onSubmit={SignUpUser} 
            shadow labelColor={'mediumLightGrey'} padding={'0 40px'} 
            data-test='component-signup'>
            <h3>Sign Up</h3>
            <div>
                <input 
                    data-test='input-username'
                    placeholder='username'
                    value={username}
                    maxLength={20}
                    onChange={(e) => setUsername(e.target.value)}
                    type='text'/>
                <input 
                    data-test='input-password'
                    placeholder='password'
                    value={password}
                    maxLength={50}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'/>
                <input 
                    data-test='input-email'
                    placeholder='email'
                    value={email}
                    maxLength={300}
                    onChange={(e) => setEmail(e.target.value)}
                    type='text'/>
                <input 
                    data-test='input-firstName'
                    placeholder='first name'
                    value={firstName}
                    maxLength={100}
                    onChange={(e) => setFirstName(e.target.value)}
                    type='text'/>
                <input 
                    data-test='input-lastName'
                    placeholder='last name'
                    value={lastName}
                    maxLength={100}
                    onChange={(e) => setLastName(e.target.value)}
                    type='text'/>
            </div>
            <ThemeProvider theme={light}>
                <MainButton
                    data-test='button-signup'
                    blue disabledMediumLight shadow margin={'10px auto'} padding={'12px 15px'}
                    type='submit'
                    disabled={username === '' || firstName === '' || lastName === '' || password === '' || email === ''}>
                        Sign Up
                </MainButton>
            </ThemeProvider>
            <p>OR</p>
            <ThemeProvider theme={light}>
                <GoogleSigninButton/>
            </ThemeProvider>
            <Link 
                data-test='link-account-verification'
                onClick={()=>showRequestAccountVerificationLink(true)}>
                Need new account verification link?
            </Link>
        </Form>
    )
}

export default SignUp