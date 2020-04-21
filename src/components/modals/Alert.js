import React, {useState} from 'react'
import {MdClose} from "react-icons/md"
import IconButton from '../styles/IconButton'
import AlertStyled from '../styles/Alert'

const Alert = ({message, closable, onClose, smallMessage}) => {
    const [isVisible, setIsVisible] = useState(true)
    const isClosable = closable !== undefined ? closable : true

    const handleClose = () => {
        if (onClose) {
            onClose()
        }
        if (isClosable) {
            setIsVisible(false)
        }
    }

    return (
        isVisible 
            ?<AlertStyled onClick={handleClose}>
                <div>
                    {isClosable && 
                        <IconButton 
                            onClick={handleClose}
                            pale circle hoverOnDark size={'36px'} float={'right'}>
                                <MdClose size={25}/>
                        </IconButton>}
                    <p>{message}</p>
                    <p>{smallMessage}</p>
                </div>
            </AlertStyled>
            : null
    )
}

export default Alert