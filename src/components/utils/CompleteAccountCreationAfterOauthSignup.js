import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {ThemeProvider} from 'styled-components'
import {completeGoogleAuthAccount} from '../../redux-store-2.0/api/session'
import {isValidFisrtOrLastname, isValidUsername} from '../../utils/helpers'
import MainButton from '../styles/MainButton'
import Form from '../styles/Form'
import {light} from '../styles/themes'
import {getOauthUserData} from '../../utils/helpers'

const CompleteAccountCreationAfterOauthSignin = ({setFormError}) => {
    const dispatch = useDispatch()
    const userData = getOauthUserData()

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState(userData.firstName)
    const [lastName, setLastName] = useState(userData.lastName)

    const CompleteSignUp = async (e) => {
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

        const user = {
            userId: username.toLowerCase().trim(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
        }
        await dispatch(completeGoogleAuthAccount(user))
    }

    return (
        <Form onSubmit={CompleteSignUp} shadow labelColor={'mediumLightGrey'} padding={'0 40px'} data-test='component-complete-oauth'>
            {console.log(userData)}
            <h3>Complete Your Registration</h3>
            <div>
                <label htmlFor='username'>Username</label>
                <input 
                    data-test='input-username'
                    value={username}
                    maxLength={20}
                    onChange={(e) => setUsername(e.target.value)}
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
                    data-test='button-complete-oauth'
                    lasrge blue disabledMediumLight shadow margin={'20px auto 35px auto'}
                    type='submit'
                    disabled={username === '' || firstName === '' || lastName === ''}>
                        Create account
                </MainButton>
            </ThemeProvider>
        </Form>
    )
}

export default CompleteAccountCreationAfterOauthSignin