import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUserById, getUserStatusById} from '../redux-store-2.0/entities/users/selectors'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
// import {LOADED} from '../redux-store-2.0/constants'
import DragAndDrop from './DragAndDrop'

const dragConfig = {
    height: 300,
    width: 300,
    aspect: 1,
    previewHeight: 100,
    previewWidth: 100
}

const General = (props) => {    
    const dispatch = useDispatch()
    const userId = useSelector(getAuthedUserId())
    const user = useSelector(getUserById(userId))
    const [crop, setCrop] = useState(null)
    // const userFetchStatus = useSelector(getUserStatusById(userId))

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [avatar, setAvatar] = useState(null)

    const handleUpdate = (e) => {
        e.preventDefault()
        const data = {user: {}}
        if (firstName !== '' && firstName !== user.firstName) {
            data.user.firstName = firstName
        }
        if (lastName !== '' && lastName !== user.lastName) {
            data.user.lastName = lastName
        }
        if (email !== '' && email !== user.email) {
            data.user.email = email        
        }
        if (avatar !== null) {
            data.file = avatar
            data.user.avatar = true
            data.user.crop = crop
        }
        console.log(data)
        if (Object.keys(data.user).length > 0) {
            props.updateProfileData(data)
        }
    }

    const handleDeleteAvatar = (e) => {
        e.preventDefault()
        dispatch(props.handleDelete({
            user: {
                userId: localStorage.getItem('userId'),
                token: localStorage.getItem('token')
            }
        }))
    }

    return (
        <form className='profile-update-data-container' onSubmit={handleUpdate}>
        <h3 className='form-header'>General Information</h3>
        <div className='inputs-container'>
            <label htmlFor='firstName'>First Name</label>
            <input 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type='text'
                className='profile-update-data-container-input'
            />
            <label htmlFor='lastName'>Last Name</label>
            <input 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type='text'
                className='profile-update-data-container-input'
            />
            <label htmlFor='email'>e-mail</label>
            <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='text'
                className='profile-update-data-container-input'
            />
            <p>Profile image</p>
            <DragAndDrop file={avatar} setFile={setAvatar} setCrop={setCrop} config={dragConfig}/>
            {/* <label htmlFor='avatarUrl'>Profile image</label>
            <input 
                value={avatar}
                onChange={(e) => setAvatarUrl(e.target.value)}
                type='text'
                className='profile-update-data-container-input'
            /> */}
            <button onClick={handleDeleteAvatar} className='profile-image-delete-btn btn-unfollow'>Delete current avatar</button>
        </div>
        <button
            type='submit'
            disabled={!((firstName !== '' && firstName !== user.firstName) || (lastName !== '' && lastName !== user.lastName) || (email !== '' && email !== user.email) || (avatar !== null && crop !== null))}
            className='btn'
            >Update
        </button>
    </form>
    )
}

export default General

