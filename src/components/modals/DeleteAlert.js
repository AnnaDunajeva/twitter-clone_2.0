import React, {useState} from 'react'
import MainButton from '../styles/MainButton'
import AlertStyled from '../styles/Alert'

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
            ?<AlertStyled>
                <div>
                    <p>{message}</p>
                    <p>{smallMessage}</p>
                    <div>
                        <MainButton 
                            small margin={'20px'} 
                            onClick={(e)=>handleDelete(e)}>
                                Delete
                        </MainButton>
                        <MainButton 
                            small primary margin={'20px'} 
                            onClick={(e)=>handleClose(e)}>
                                Cancel
                        </MainButton>
                    </div>
                </div>
            </AlertStyled>
            : null
    )
}

export default DeleteAlert