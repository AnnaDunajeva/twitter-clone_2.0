import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize';
import {defaultBackgroundColor} from '../../../redux-store-2.0/constants'
import {getAuthedUserProfile} from '../../../redux-store-2.0/entities/users/selectors'
import DeleteAlert from '../../modals/DeleteAlert'
import DragAndDrop from '../../utils/DragAndDrop'
import ColorPicker from '../../utils/ColorPicker'
import MainButton from '../../styles/MainButton'
import Form from '../../styles/Form'
import {isValidLocation} from '../../../utils/helpers'

const dragConfig = {
    height: 275,
    width: 275,
    aspect: 970/194,
    previewHeight: 30,
    previewWidth: 150
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
            if (!isValidLocation(location)) {
                props.setFormError('You can only use alphabetic characters, "-", "," or space in your location.')
                return
            }
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
    const handleDeleteBackground = (e) => {
        e.preventDefault() 
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
        <React.Fragment>
            {deleteBackground && 
                <DeleteAlert 
                    onDelete={handleDeleteBackground} 
                    onClose={()=>setDeleteBackground(false)} 
                    message={'Are you sure you want to delete your current background image permanently?'}/>}
            <Form onSubmit={handleUpdate} shadow padding={'0 0 20px 0'}>
                {/* prevent for submission on enter */}
                <button type="submit" disabled style={{display: "none"}}></button> 

                <h3>Additional Information</h3>

                <div>
                    <label>Description</label>
                    <TextareaAutosize 
                        maxLength={maxlength}
                        placeholder={'Tell something about yourself...'}
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        minRows={2}
                        maxRows={6}/>

                    <label htmlFor='location'>Location</label>
                    <input 
                        value={location}
                        maxLength={60}
                        onChange={(e) => setLocation(e.target.value)}
                        type='text'/>

                    <label>Background color</label>
                    <ColorPicker handleChangeComplete={handleChangeComplete} color={color}/>

                    <label>Background image</label>

                    <MainButton 
                        primary shadow
                        onClick={(e)=>{e.preventDefault(); setDeleteBackground(true)}}>
                            Delete current background
                    </MainButton>
                    <label>Upload new image</label>
                    <DragAndDrop 
                        file={file} 
                        setFile={setFile} 
                        setCrop={setCrop} 
                        config={dragConfig}
                        cropResult={cropResult}
                        handleAcceptImage={handleAcceptImage} 
                        handleRemoveImage={handleRemoveImage}
                        profile={true}
                    />
                </div>
        
                <MainButton
                    blue mediumSmall center disabledLight uppercase shadow
                    disabled={isDisabled()}
                    type='submit'>
                     Update
                </MainButton>
            </Form>
        </React.Fragment>
    )
}

export default Additional

