import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {getUserById, getUserStatusById} from '../redux-store-2.0/entities/users/selectors'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import TextareaAutosize from 'react-textarea-autosize';
import { ChromePicker  } from 'react-color';
import {IoMdColorFill} from 'react-icons/io'
import {defaultBackgroundColor} from '../redux-store-2.0/constants'
// import ColorPicker from '@mapbox/react-colorpickr'

// import {LOADED} from '../redux-store-2.0/constants'

const Additional = (props) => {    
    const maxlength = 100
    const userId = useSelector(getAuthedUserId())
    const user = useSelector(getUserById(userId))

    const [description, setDescription] = useState(user.description || '')
    const [location, setLocation] = useState(user.location || '')
    const [background, setBackground] = useState(user.backgroundURL || '')

    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false)
    const [color, setColor] = useState(user.backgroundColor || defaultBackgroundColor)

    const handleUpdate = (e) => {
        e.preventDefault()
        const data = {}
        if (location !== '' && location !== user.location) {
            data.location = location
        }
        if (description !== '' && description !== user.description) {
            data.description = description
        }
        if (color !== defaultBackgroundColor || color !== user.backgroundColor) {
            data.background = color
        }
        if (background !== '' && background !== user.backgroundURL) {
            data.background = background        
        }

        console.log(data)
        if (Object.keys(data).length > 0) {
            props.updateProfileData(data)
        }
    }
    const handleChangeComplete = (color) => {
        setColor(color.hex)
    }

    return (
        <form className='profile-update-data-container position-relative' onSubmit={handleUpdate}>
            <h3 className='form-header'>Additional Information</h3>
            <div className='inputs-container'>
                <TextareaAutosize 
                    className='textarea-update'
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
                />
                <label htmlFor='background URL'>Background URL</label>
                <input 
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    type='text'
                />
                <label htmlFor='color'>...Or pick a color</label>
                <input 
                    value={color}
                    type='text'
                    readOnly={true}
                />
                <IoMdColorFill className='icon' onClick={()=>setIsColorPickerVisible(!isColorPickerVisible)}/>
                {isColorPickerVisible && 
                    <ChromePicker 
                        color={ color }
                        onChangeComplete={ handleChangeComplete }
                        width={250}
                        // presetColors={[]}
                        disableAlpha={true}
                    />
                //     <ColorPicker
                //     style={{
                //       height: '100px',
                //       width: '100%'
                //     }}
                //     color={color}
                //     onChange={handleChangeComplete}
                //   />
                }
            </div>
            <button
                type='submit'
                disabled={!((user.location !== location && location !=='') || (description !== '' && description !== user.description) || (color !== defaultBackgroundColor && color !== user.backgroundColor) || (background !== '' && background !== user.backgroundURL))}
                className='btn'
                >Update
            </button>
        </form>
    )
}

export default Additional

