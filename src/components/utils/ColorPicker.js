import React, {useState, useRef} from 'react'
import { ChromePicker  } from 'react-color';
import {IoMdColorFill} from 'react-icons/io'

const ColorPicker = ({handleChangeComplete, color}) => { 

    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false)
    
    const closeColorPickerArea = useRef(null) //area where you can click to close color picker

    const handleColorPickerClose = (e) => {
        if (e.target === closeColorPickerArea.current) {
            setIsColorPickerVisible(!isColorPickerVisible)
        }
    }

    return (
        <div className='color-picker-container position-relative'>
            <div className='profile-update-data-container-input color-input' style={{background: color}}>
            </div>
            <IoMdColorFill 
                className='icon color-picker-icon' 
                onClick={()=>setIsColorPickerVisible(!isColorPickerVisible)}
            />
            {isColorPickerVisible && 
                <React.Fragment>
                    <div 
                        className='alert-container' 
                        ref={closeColorPickerArea} 
                        onClick={handleColorPickerClose} 
                        style={{backgroundColor: 'transparent', zIndex: '0'}}
                    >
                    </div>
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
    )
}

export default ColorPicker

