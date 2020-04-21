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
            // ? <div className='alert-container'>
            //     <div className='alert-box'>
            //         <p className='alert-content'>{message}</p>
            //         <div style={{display: 'flex', justifyContent: 'space-around'}}>
            //             <MainButton 
            //                 small margin={'20px'} 
            //                 onClick={handleDelete}>
            //                     Delete
            //             </MainButton>
            //             <MainButton 
            //                 small primary margin={'20px'} 
            //                 onClick={handleClose}>
            //                     Cancel
            //             </MainButton>
            //         </div>
            //     </div>
            // </div>
            ?<AlertStyled>
                <div>
                    <p>{message}</p>
                    <p>{smallMessage}</p>
                    <div>
                        <MainButton 
                            small margin={'20px'} 
                            onClick={handleDelete}>
                                Delete
                        </MainButton>
                        <MainButton 
                            small primary margin={'20px'} 
                            onClick={handleClose}>
                                Cancel
                        </MainButton>
                    </div>
                </div>
            </AlertStyled>
            : null
    )
}

export default DeleteAlert