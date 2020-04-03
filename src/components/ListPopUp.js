import React, {useState, useRef} from 'react'
import {MdClose} from "react-icons/md"

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
            ? <div className='alert-container' onClick={handleClose} ref={closeArea}>
                <div className='list-popup-box-wrapper'>
                    <div id={id} className='list-popup-box'>
                        <MdClose size={25} className='close-alert-btn' onClick={hanbleCloseButton}/>
                        <p className='header'>{header}</p>
                        {/* <div className='list-popup-content'> */}
                        {children}
                        {/* </div> */}
                    </div>
                </div>
            </div>
            : null
    )
}

export default ListPopUp