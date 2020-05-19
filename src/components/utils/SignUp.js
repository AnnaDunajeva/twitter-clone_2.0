import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {ThemeProvider} from 'styled-components'
import {signUp} from '../../redux-store-2.0/api/session'
import {validateEmail, isValidFisrtOrLastname, isValidUsername} from '../../utils/helpers'
import MainButton from '../styles/MainButton'
import ButtonWithIconNonTransparent from '../styles/ButtonWithIconNonTransparent'
import Form from '../styles/Form'
import {light} from '../styles/themes'
import Link from '../styles/Link'
import {URL} from '../../redux-store-2.0/constants'
import {FaGoogle} from 'react-icons/fa'

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
        <Form onSubmit={SignUpUser} shadow labelColor={'mediumLightGrey'} padding={'0 40px'} data-test='component-signup'>
            <h3>Sign Up</h3>
            <div>
                <label htmlFor='username'>Username</label>
                <input 
                    data-test='input-username'
                    value={username}
                    maxLength={20}
                    onChange={(e) => setUsername(e.target.value)}
                    type='text'/>
                <label htmlFor='password'>Password</label>
                <input 
                    data-test='input-password'
                    value={password}
                    maxLength={50}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'/>
                <label htmlFor='email'>e-mail</label>
                <input 
                    data-test='input-email'
                    value={email}
                    maxLength={300}
                    onChange={(e) => setEmail(e.target.value)}
                    type='text'/>
                <label htmlFor='firstName'>First Name</label>
                <input 
                    data-test='input-firstName'
                    value={firstName}
                    maxLength={100}
                    onChange={(e) => setFirstName(e.target.value)}
                    type='text'/>
                <label htmlFor='lastName'>Last Name</label>
                <input 
                    data-test='input-lastName'
                    value={lastName}
                    maxLength={100}
                    onChange={(e) => setLastName(e.target.value)}
                    type='text'/>
            </div>
            <ThemeProvider theme={light}>
                <MainButton
                    data-test='button-signup'
                    blue disabledMediumLight shadow margin={'10px auto'} padding={'8px 15px'}
                    type='submit'
                    disabled={username === '' || firstName === '' || lastName === '' || password === '' || email === ''}>
                        Sign Up
                </MainButton>
            </ThemeProvider>
            <p>OR</p>
            <ButtonWithIconNonTransparent 
                as='a' href={`${URL}/user/login/google`}
                blue margin={'10px auto'} padding={'8px 15px'}>
                <FaGoogle />
                    Sign in with Google
            </ButtonWithIconNonTransparent>
            <Link 
                onClick={()=>showRequestAccountVerificationLink(true)}>
                Need new account verification link?
            </Link>
        </Form>
    )
}

export default SignUp