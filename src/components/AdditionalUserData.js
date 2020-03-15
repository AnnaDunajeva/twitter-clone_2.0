import React, {useState, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUserById, getUserStatusById} from '../redux-store-2.0/entities/users/selectors'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import TextareaAutosize from 'react-textarea-autosize';
import { ChromePicker  } from 'react-color';
import {IoMdColorFill} from 'react-icons/io'
import {defaultBackgroundColor} from '../redux-store-2.0/constants'
import DeleteAlert from './DeleteAlert'
// import ColorPicker from '@mapbox/react-colorpickr'

// import {LOADED} from '../redux-store-2.0/constants'

// const Additional = (props) => {    
//     const closeColorPickerArea = useRef(null)
//     const maxlength = 100
//     const userId = useSelector(getAuthedUserId())
//     const user = useSelector(getUserById(userId))

//     const [description, setDescription] = useState(user.description || '')
//     const [location, setLocation] = useState(user.location || '')
//     const [background, setBackground] = useState(user.backgroundURL || '')

//     const [isColorPickerVisible, setIsColorPickerVisible] = useState(false)
//     const [color, setColor] = useState(user.backgroundColor || defaultBackgroundColor)

//     const handleUpdate = (e) => {
//         e.preventDefault()
//         const data = {}
//         if (location !== '' && location !== user.location) {
//             data.location = location
//         }
//         if (description !== '' && description !== user.description) {
//             data.description = description
//         }
//         if (color !== defaultBackgroundColor || color !== user.backgroundColor) {
//             data.background = color
//         }
//         if (background !== '' && background !== user.backgroundURL) {
//             data.background = background        
//         }

//         console.log(data)
//         if (Object.keys(data).length > 0) {
//             props.updateProfileData(data)
//         }
//     }
//     const handleChangeComplete = (color) => {
//         setColor(color.hex)
//     }
//     const handleColorPickerClose = (e) => {
//         if (e.target === closeColorPickerArea.current) {
//             setIsColorPickerVisible(!isColorPickerVisible)
//         }
//     }

//     return (
//         <form className='profile-update-data-container position-relative' onSubmit={handleUpdate}>
//             <h3 className='form-header'>Additional Information</h3>
//             <div className='inputs-container'>
//                 <p>Description</p>
//                 <TextareaAutosize 
//                     className='profile-update-data-container-input textarea-update'
//                     maxLength={maxlength}
//                     placeholder={'Tell something about yourself...'}
//                     value={description}
//                     onChange={(e)=>setDescription(e.target.value)}
//                     minRows={2}
//                     maxRows={6}
//                 />
//                 <label htmlFor='location'>Location</label>
//                 <input 
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     type='text'
//                     className='profile-update-data-container-input'
//                 />
//                 <label htmlFor='background URL'>Background URL</label>
//                 <input 
//                     value={background}
//                     onChange={(e) => setBackground(e.target.value)}
//                     type='text'
//                     className='profile-update-data-container-input'
//                 />
//                 {/* <input type='file' name='image' /> */}
//                 <p>Background color</p>
//                 <div className='color-picker-container'>
//                     <div className='profile-update-data-container-input color-input'>
//                         {color}
//                     </div>
//                     <IoMdColorFill className='icon color-picker-icon' onClick={()=>setIsColorPickerVisible(!isColorPickerVisible)}/>
//                     {isColorPickerVisible && 
//                         <div className='alert-container' ref={closeColorPickerArea} onClick={handleColorPickerClose} style={{backgroundColor: 'transparent'}}>
//                             <ChromePicker 
//                                 color={ color }
//                                 onChangeComplete={ handleChangeComplete }
//                                 width={250}
//                                 disableAlpha={true}
//                                 className='color-picker-tool'
//                             />
//                         </div>
//                     }  
//                 </div>
//                 {/* <label htmlFor='color'>...Or pick a color</label>
//                 <input 
//                     value={color}
//                     type='text'
//                     readOnly={true}
//                 />
//                 <div className='color=picker-container'>
//                     <IoMdColorFill className='icon' onClick={()=>setIsColorPickerVisible(!isColorPickerVisible)}/>
//                     {isColorPickerVisible && 
//                         <ChromePicker 
//                             color={ color }
//                             onChangeComplete={ handleChangeComplete }
//                             width={250}
//                             disableAlpha={true}
//                         />
//                 }  
//                 </div> */}
//             </div>
//             <button
//                 type='submit'
//                 disabled={!((user.location !== location && location !=='') || (description !== '' && description !== user.description) || (color !== defaultBackgroundColor && color !== user.backgroundColor) || (background !== '' && background !== user.backgroundURL))}
//                 className='btn'
//                 >Update
//             </button>
//         </form>
//     )
// }

// export default Additional

import DragAndDrop from './DragAndDrop'

const dragConfig = {
    height: 400,
    width: 400,
    aspect: 970/194,
    previewHeight: 80,
    previewWidth: 400
}

const Additional = (props) => {    
    const dispatch = useDispatch()
    const closeColorPickerArea = useRef(null)
    const maxlength = 100
    const userId = useSelector(getAuthedUserId())
    const user = useSelector(getUserById(userId))
    const [file, setFile] = useState(null)
    const [crop, setCrop] = useState(null)
    const [cropResult, setCropResult] = useState(null)
    const [description, setDescription] = useState(user.description || '')
    const [location, setLocation] = useState(user.location || '')
    // const [background, setBackground] = useState(user.backgroundURL || '')

    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false)
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
    const handleColorPickerClose = (e) => {
        if (e.target === closeColorPickerArea.current) {
            setIsColorPickerVisible(!isColorPickerVisible)
        }
    }

    const handleDeleteBackground = () => {
        dispatch(props.handleDelete({
            user: {
                userId: localStorage.getItem('userId'),
                token: localStorage.getItem('token')
            }
        }))
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

    return (
        <form className='profile-update-data-container position-relative' onSubmit={handleUpdate}>
            {console.log('Additional file ', file)}
            {deleteBackground && <DeleteAlert onDelete={handleDeleteBackground} onClose={()=>setDeleteBackground(false)} message={'Are you sure you want to delete your current background image permanentely?'}/>}
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
                    className='profile-update-data-container-input'
                />
                <p>Background color</p>
                <div className='color-picker-container position-relative'>
                    <div className='profile-update-data-container-input color-input' style={{background: color}}>
                        {/* {color} */}
                    </div>
                    <IoMdColorFill className='icon color-picker-icon' onClick={()=>setIsColorPickerVisible(!isColorPickerVisible)}/>
                    {isColorPickerVisible && 
                        <React.Fragment>
                            <div className='alert-container' ref={closeColorPickerArea} onClick={handleColorPickerClose} style={{backgroundColor: 'transparent', zIndex: '0'}}></div>
                            <ChromePicker 
                                color={ color }
                                onChangeComplete={ handleChangeComplete }
                                width={250}
                                disableAlpha={true}
                                className='color-picker-tool'
                            />
                        </React.Fragment>
                    }  
                </div>
                <p>Background image</p>
                <button onClick={()=>setDeleteBackground(true)} className='profile-image-delete-btn btn-unfollow'> Delete current background</button>
                <p>Upload new image</p>
                <DragAndDrop 
                    file={file} 
                    setFile={setFile} 
                    setCrop={setCrop} 
                    config={dragConfig}
                    cropResult={cropResult}
                    handleAcceptImage={handleAcceptImage} 
                    handleRemoveImage={handleRemoveImage}/>
            </div>
            <button
                type='submit'
                disabled={!((user.location !== location && location !=='') || (description !== '' && description !== user.description) || (color !== defaultBackgroundColor && color !== user.backgroundColor) || (file !== null && crop !== null))}
                className='btn'
                >Update
            </button>
        </form>
    )
}

export default Additional

