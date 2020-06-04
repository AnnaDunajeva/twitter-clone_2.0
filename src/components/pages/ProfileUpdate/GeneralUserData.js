import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {updateProfile} from '../../../redux-store-2.0/api/users'
import {getAuthedUserProfile} from '../../../redux-store-2.0/entities/users/selectors'
import {deleteAvatar as deleteAvatarFunc} from '../../../redux-store-2.0/api/users'
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

const General = ({setFormError}) => {    
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
        const data = {userData: {}}
        if (firstName !== '' && firstName !== user.firstName) {
            if (!isValidFisrtOrLastname(firstName)) {
                setFormError('You can only use alphabetic characters, space and "-" in your name.')
                return
            }
            data.userData.firstName = firstName
        }
        if (lastName !== '' && lastName !== user.lastName) {
            if (!isValidFisrtOrLastname(lastName)) {
                setFormError('You can only use alphabetic characters, space and "-" in your name.')
                return
            }
            data.userData.lastName = lastName
        }
        if (avatar !== null) {
            data.file = avatar
            data.userData.avatar = true
            data.userData.crop = crop
        }
        console.log(data)
        if (Object.keys(data.userData).length > 0) {
            dispatch(updateProfile(data))
            setAvatar(null)
            setCrop(null)
            setCropResult(null)
        }
    }

    const handleDeleteAvatar = () => {
        dispatch(deleteAvatarFunc())
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
        const isAvatar = avatar !== null && crop !== null
        if (isFirstName || isLastName || isAvatar) {
            return false
        }
        return true
    }

    return (
        <React.Fragment>
            {deleteAvatar && 
                <DeleteAlert 
                    onDelete={handleDeleteAvatar} 
                    onClose={()=>setDeleteAvatar(false)} 
                    message={'Are you sure you want to delete your current avatar image permanently?'}/>}
                    
            <Form 
                onSubmit={(e)=>handleUpdate(e)} 
                data-test='component-general-user-data'
                shadow padding={'0 0 20px 0'}>
                {/* prevent for submission on enter, should check how it works in different browsers */}
                <button type="submit" disabled style={{display:"none"}}></button>

                <h3>General Information</h3>
                <div>
                    <label htmlFor='firstName'>First Name</label>
                    <input 
                        data-test='input-firstname'
                        value={firstName}
                        maxLength={35}
                        onChange={(e) => setFirstName(e.target.value)}
                        type='text'/>
                    <label htmlFor='lastName'>Last Name</label>
                    <input 
                        data-test='input-lastname'
                        value={lastName}
                        maxLength={35}
                        onChange={(e) => setLastName(e.target.value)}
                        type='text'/>
                    <label>Profile image</label>
                    <MainButton 
                        data-test='button-delete-avatar'
                        primary shadow
                        onClick={(e)=>{e.preventDefault(); setDeleteAvatar(true)}}>
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
                        profile={true}
                    />
                </div>

                <MainButton
                    data-test='button-submit'
                    blue mediumSmall center disabledLight uppercase shadow
                    disabled={isDisabled()}
                    type='submit'>
                        Update
                </MainButton>
            </Form>
        </React.Fragment>
    )
}

export default General

