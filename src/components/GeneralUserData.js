import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import DragAndDrop from './DragAndDrop'
import DeleteAlert from './DeleteAlert'
import {getAuthedUserProfile} from '../redux-store-2.0/entities/users/selectors'
import useAuthedUserCredentials from '../Hooks/useAuthedUserCredentials'

const dragConfig = {
    height: 300,
    width: 300,
    aspect: 1,
    previewHeight: 100,
    previewWidth: 100
}

const General = (props) => {    
    const dispatch = useDispatch()

    const user = useSelector(getAuthedUserProfile())
    const userCredentials = useAuthedUserCredentials()

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [avatar, setAvatar] = useState(null)
    const [crop, setCrop] = useState(null)
    const [cropResult, setCropResult] = useState(null)
    const [deleteAvatar, setDeleteAvatar] = useState(false)

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
            setAvatar(null)
            setCrop(null)
            setCropResult(null)
        }
    }

    const handleDeleteAvatar = () => {
        dispatch(props.handleDelete(userCredentials))
    }

    const handleRemoveImage = (e) => {
        e.preventDefault() 
        setAvatar(null)
        setCropResult(null)
    }
    const handleAcceptImage = (cropper) => {
        const crop = cropper.getData()
        setCrop(crop)
        setCropResult(cropper.getCroppedCanvas().toDataURL())
    }
    const isDisabled = () => {
        const isFirstName = firstName !== '' && firstName !== user.firstName
        const isLastName = lastName !== '' && lastName !== user.lastName
        const isEmail = email !== '' && email !== user.email
        const isAvatar = avatar !== null && crop !== null
        if (isFirstName || isLastName || isEmail || isAvatar) {
            return false
        }
        return true
    }

    return (
        <form className='profile-update-data-container' onSubmit={handleUpdate}>
            {deleteAvatar && 
                <DeleteAlert 
                    onDelete={handleDeleteAvatar} 
                    onClose={()=>setDeleteAvatar(false)} 
                    message={'Are you sure you want to delete your current avatar image permanently?'}
                />
            }
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
                <button 
                    onClick={()=>setDeleteAvatar(true)} 
                    className='profile-image-delete-btn btn-unfollow'
                >
                    Delete current avatar
                </button>
                <p>Upload new image</p>
                <DragAndDrop 
                    file={avatar} 
                    setFile={setAvatar} 
                    setCrop={setCrop} 
                    config={dragConfig}
                    cropResult={cropResult}
                    handleAcceptImage={handleAcceptImage} 
                    handleRemoveImage={handleRemoveImage}
                />
            </div>
            <button
                type='submit'
                disabled={isDisabled()}
                className='btn'
                >Update
            </button>
        </form>
    )
}

export default General

