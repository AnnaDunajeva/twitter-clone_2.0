import React, {useState} from 'react'
import {MdClose} from "react-icons/md"
import IconButton from '../styles/IconButton'
import AlertStyled from '../styles/Alert'
import PropTypes from 'prop-types'

const Alert = ({message, closable, onClose, smallMessage}) => {
    const [isVisible, setIsVisible] = useState(true)

    const handleClose = (e) => {
        e.preventDefault()
        if (onClose) {
            onClose()
        }
        if (closable) {
            setIsVisible(false)
        }
    }

    return (
        isVisible 
            ?<AlertStyled onClick={(e)=>handleClose(e)} data-test='component-alert'>
                <div>
                    {closable && 
                        <IconButton 
                            onClick={(e)=>handleClose(e)}
                            data-test='button-close'
                            pale circle hoverOnDark size={'36px'} float={'right'}>
                                <MdClose size={25}/>
                        </IconButton>}
                    <p data-test='message'>{message}</p>
                    <p data-test='smallMessage'>{smallMessage}</p>
                </div>
            </AlertStyled>
            : null
    )
}

Alert.propTypes = {
    message: PropTypes.string,
    closable: PropTypes.bool,
    onClose: PropTypes.func,
    smallMessage: PropTypes.string
}
Alert.defaultProps = {
    closable: true
}

export default Alert
