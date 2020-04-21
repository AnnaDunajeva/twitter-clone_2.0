import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getAuthedUserProfile} from '../../../redux-store-2.0/entities/users/selectors'
import DragAndDrop from '../../utils/DragAndDrop'
import DeleteAlert from '../../modals/DeleteAlert'
import {isValidFisrtOrLastname} from '../../../utils/helpers'
import MainButton from '../../styles/MainButton'
import Form from '../../styles/Form'

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

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [avatar, setAvatar] = useState(null)
    const [crop, setCrop] = useState(null)
    const [cropResult, setCropResult] = useState(null)
    const [deleteAvatar, setDeleteAvatar] = useState(false)

    const handleUpdate = (e) => {
        e.preventDefault()
        const data = {user: {}}
        if (firstName !== '' && firstName !== user.firstName) {
            if (!isValidFisrtOrLastname(firstName)) {
                props.setFormError('You can only use alphabetic characters and "-" in your name.')
                return
            }
            data.user.firstName = firstName
        }
        if (lastName !== '' && lastName !== user.lastName) {
            if (!isValidFisrtOrLastname(lastName)) {
                props.setFormError('You can only use alphabetic characters and "-" in your name.')
                return
            }
            data.user.lastName = lastName
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
        dispatch(props.handleDelete())
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
        // const isEmail = email !== '' && email !== user.email
        const isAvatar = avatar !== null && crop !== null
        if (isFirstName || isLastName || isAvatar) {
            return false
        }
        return true
    }

    return (
        <Form onSubmit={handleUpdate} shadow padding={'0 0 20px 0'}>
            {deleteAvatar && 
                <DeleteAlert 
                    onDelete={handleDeleteAvatar} 
                    onClose={()=>setDeleteAvatar(false)} 
                    message={'Are you sure you want to delete your current avatar image permanently?'}
                />
            }
            <h3>General Information</h3>
            <div>
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
                <label>Profile image</label>
                <MainButton 
                    primary shadow={'lightShadow'}
                    onClick={()=>setDeleteAvatar(true)}>
                        Delete current avatar
                </MainButton>
                <label>Upload new image</label>
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

            <MainButton
                blue mediumSmall center disabledLight uppercase shadow={'lightShadow'}
                disabled={isDisabled()}
                type='submit'>
                    Update
            </MainButton>
        </Form>
    )
}

export default General

