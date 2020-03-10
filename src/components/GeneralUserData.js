import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUserById, getUserStatusById} from '../redux-store-2.0/entities/users/selectors'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import {LOADED} from '../redux-store-2.0/constants'

const General = () => {    
    const userId = useSelector(getAuthedUserId())
    const user = useSelector(getUserById(userId))
    const userFetchStatus = useSelector(getUserStatusById(userId))

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [avatarURL, setAvatarUrl] = useState(user.avatarURL)
    const [backgroundURL, setBackgroundURL] = useState(user.backgroundURL || '')

    const dispatch = useDispatch()

    return (
        <form className='profile-update-data-container'>
        <h3 className='form-header'>General Information</h3>
        <div className='inputs-container'>
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
            <label htmlFor='email'>e-mail</label>
            <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='text'
            />
            <label htmlFor='avatarUrl'>Avatar URL</label>
            <input 
                value={avatarURL}
                onChange={(e) => setAvatarUrl(e.target.value)}
                type='text'
            />
            {/* <label htmlFor='avatarUrl'>Background URL</label>
            <input 
                value={backgroundURL}
                onChange={(e) => setBackgroundURL(e.target.value)}
                type='text'
            /> */}
        </div>
        <button
            type='submit'
            disabled={!(firstName !== user.firstName || lastName !== user.lastName || avatarURL !== user.avatarURL || email !== user.email) || (firstName === '' || lastName === '' || avatarURL === '' || email === '')}
            className='btn'
            >Update
        </button>
    </form>
    )
}

export default General

