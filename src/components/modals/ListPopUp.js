import React, {useState, useRef} from 'react'
import {MdClose} from "react-icons/md"
import IconButton from '../styles/IconButton'
import ListPopUpBox from '../styles/ListPopUpBox'

const ListPopUp = ({header, onClose, id, children}) => {
    const [isVisible, setIsVisible] = useState(true)
    const closeArea = useRef(null)

    const handleClose = (e) => {
        if (e.target === closeArea.current) {
            if (onClose) {
                onClose()
            } 
            setIsVisible(false)
        }
    }
    const hanbleCloseButton = () => {
        if (onClose) {
            onClose()
        } 
        setIsVisible(false) 
    }

    return (
        isVisible 
            ?<ListPopUpBox onClick={handleClose} ref={closeArea}>
                <div>
                    <div id={id}>
                        <IconButton 
                            onClick={hanbleCloseButton}
                            pale circle hoverOnDark size={'36px'}
                            float={'right'}>
                            <MdClose size={27}/>
                        </IconButton>
                        <p>{header}</p>
                        {children}
                    </div>
                </div>
            </ListPopUpBox>
            : null
    )
}

export default ListPopUp