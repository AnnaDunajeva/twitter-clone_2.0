import React, {useState} from 'react'
import {MdClose} from "react-icons/md"

const Alert = ({message, closable, onClose, smallMessage}) => {
    const [isVisible, setIsVisible] = useState(true)
    const isClosable = closable !== undefined ? closable : true

    const handleClose = () => {
        if (onClose) {
            onClose()
        } else if (isClosable) {
            setIsVisible(false)
        }
    }

    return (
        isVisible 
            ? <div className='alert-container' onClick={handleClose}>
                <div className='alert-box'>
                    {isClosable && <MdClose size={25} className='close-alert-btn' onClick={handleClose}/>}
                    <div className='alert-content'>{message}</div>
                    <div className='alert-content' style={{fontSize: '18px'}}>{smallMessage}</div>
                </div>
            </div>
            : null
    )
}

export default Alert