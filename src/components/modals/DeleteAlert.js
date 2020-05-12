import React, {useState} from 'react'
import MainButton from '../styles/MainButton'
import AlertStyled from '../styles/Alert'
import PropTypes from 'prop-types'

const DeleteAlert = ({message, smallMessage, onClose, onDelete}) => {
    const [isVisible, setIsVisible] = useState(true)

    const handleClose = (e) => {
        e.preventDefault()
        if (onClose) {
            onClose()
        } 
        setIsVisible(false)
    }
    const handleDelete = (e) => {
        e.preventDefault()
        if (onDelete) {
            onDelete()
        } 
        setIsVisible(false)
    }

    return (
        isVisible 
            ?<AlertStyled data-test='component-alert'>
                <div>
                    <p data-test='message'>{message}</p>
                    <p data-test='smallMessage'>{smallMessage}</p>
                    <div>
                        <MainButton 
                            small margin={'20px'} 
                            data-test="button-delete"
                            onClick={(e)=>handleDelete(e)}>
                                Delete
                        </MainButton>
                        <MainButton 
                            small primary margin={'20px'} 
                            data-test="button-close"
                            onClick={(e)=>handleClose(e)}>
                                Cancel
                        </MainButton>
                    </div>
                </div>
            </AlertStyled>
            : null
    )
}

DeleteAlert.propTypes = {
    message: PropTypes.string,
    onDelete: PropTypes.func,
    onClose: PropTypes.func,
    smallMessage: PropTypes.string
}

export default DeleteAlert