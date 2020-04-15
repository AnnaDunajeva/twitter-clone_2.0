import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize';
import {defaultBackgroundColor} from '../../../redux-store-2.0/constants'
import {getAuthedUserProfile} from '../../../redux-store-2.0/entities/users/selectors'
import DeleteAlert from '../../modals/DeleteAlert'
import DragAndDrop from '../../utils/DragAndDrop'
import ColorPicker from '../../utils/ColorPicker'

const dragConfig = {
    height: 400,
    width: 400,
    aspect: 970/194,
    previewHeight: 80,
    previewWidth: 400
}

const Additional = (props) => { 
    const maxlength = 100   
    const dispatch = useDispatch()

    const user = useSelector(getAuthedUserProfile())

    const [file, setFile] = useState(null)
    const [crop, setCrop] = useState(null)
    const [cropResult, setCropResult] = useState(null)
    const [description, setDescription] = useState(user.description || '')
    const [location, setLocation] = useState(user.location || '')
    const [color, setColor] = useState(user.backgroundColor || defaultBackgroundColor)
    const [deleteBackground, setDeleteBackground] = useState(false)

    const handleUpdate = (e) => {
        e.preventDefault()
        const data = {user: {}}
        if (location !== '' && location !== user.location) {
            data.user.location = location
        }
        if (description !== '' && description !== user.description) {
            data.user.description = description
        }
        if (color !== defaultBackgroundColor && color !== user.backgroundColor) {
            data.user.backgroundColor = color
        }
        if (file !== null) {
            data.file = file  
            data.user.backgroundImage = true    
            data.user.crop = crop  
        }

        console.log(data)
        if (Object.keys(data.user).length > 0) {
            props.updateProfileData(data)
            setFile(null)
            setCrop(null)
            setCropResult(null)
        }
    }
    const handleChangeComplete = (color) => {
        setColor(color.hex)
    }
    const handleDeleteBackground = () => {
        dispatch(props.handleDelete({}))
    }
    const handleRemoveImage = (e) => {
        e.preventDefault() 
        setFile(null)
        setCropResult(null)
    }
    const handleAcceptImage = (cropper) => {
        const crop = cropper.getData()
        setCrop(crop)
        setCropResult(cropper.getCroppedCanvas().toDataURL())
    }
    const isDisabled = () => {
        const isLocation = user.location !== location && location !==''
        const isDescription = description !== '' && description !== user.description
        const isColor = color !== defaultBackgroundColor && color !== user.backgroundColor
        const isFile = file !== null && crop !== null
        if (isLocation || isDescription || isColor || isFile) {
            return false
        }
        return true
    }

    return (
        <form className='profile-update-data-container position-relative' onSubmit={handleUpdate}>
            {deleteBackground && 
                <DeleteAlert 
                    onDelete={handleDeleteBackground} 
                    onClose={()=>setDeleteBackground(false)} 
                    message={'Are you sure you want to delete your current background image permanently?'}
                />}

            <h3 className='form-header'>Additional Information</h3>

            <div className='inputs-container'>
                <p>Description</p>
                <TextareaAutosize 
                    className='profile-update-data-container-input textarea-update'
                    maxLength={maxlength}
                    placeholder={'Tell something about yourself...'}
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    minRows={2}
                    maxRows={6}
                />

                <label htmlFor='location'>Location</label>
                <input 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    type='text'
                    className='profile-update-data-container-input'/>

                <p>Background color</p>
                <ColorPicker handleChangeComplete={handleChangeComplete} color={color}/>

                <p>Background image</p>
                <button 
                    onClick={()=>setDeleteBackground(true)} 
                    className='profile-image-delete-btn btn-unfollow'> 
                        Delete current background
                </button>
                <p>Upload new image</p>
                <DragAndDrop 
                    file={file} 
                    setFile={setFile} 
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

export default Additional

