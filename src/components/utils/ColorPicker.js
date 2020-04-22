import React, {useState, useRef} from 'react'
import { ChromePicker  } from 'react-color';
import {IoMdColorFill} from 'react-icons/io'
import IconButton from '../styles/IconButton'
import {ColorPickerContainer, ColorPickerTool} from '../styles/ColorPicker'
import ModalContainer from '../styles/ModalContainer'

const ColorPicker = ({handleChangeComplete, color}) => { 

    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false)
    
    const closeColorPickerArea = useRef(null) //area where you can click to close color picker

    const handleColorPickerClose = (e) => {
        e.preventDefault()
        if (e.target === closeColorPickerArea.current) {
            setIsColorPickerVisible(!isColorPickerVisible)
        }
    }

    return (
        <ColorPickerContainer>
        <div style={{background: color}}>
        </div>
        <IconButton 
            onClick={(e)=>{e.preventDefault(); setIsColorPickerVisible(!isColorPickerVisible)}}
            hoverOnDark circle size={'50px'} margin={'0 5px'}>
                <IoMdColorFill size={35}/>
        </IconButton>
        {isColorPickerVisible && 
            <React.Fragment>
                <ModalContainer 
                    background={'transparent'} style={{zIndex: '0'}} 
                    onClick={handleColorPickerClose} 
                    ref={closeColorPickerArea} />
                <ColorPickerTool as={ChromePicker}
                    color={ color }
                    onChangeComplete={ handleChangeComplete }
                    width={250}
                    disableAlpha={true}/>
            </React.Fragment>}  
    </ColorPickerContainer>
    )
}

export default ColorPicker

