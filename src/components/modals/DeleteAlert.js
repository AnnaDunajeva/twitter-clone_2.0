import React, {useState} from 'react'

const DeleteAlert = ({message, onClose, onDelete}) => {
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
            ? <div className='alert-container'>
                <div className='alert-box'>
                    <div className='alert-content'>{message}</div>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <button onClick={handleDelete} className='btn-usercard btn-follow'>
                            Delete
                        </button>
                        <button onClick={handleClose} className='btn-usercard btn-unfollow'>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            : null
    )
}

export default DeleteAlert