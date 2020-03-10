import React, {useState} from 'react'
import {MdClose} from "react-icons/md"

const Alert = ({message}) => {
    const [isVisible, setIsVisible] = useState(true)

    return (
        isVisible 
            ? <div className='alert-container' onClick={()=>setIsVisible(false)}>
                <div className='alert-box'>
                    <MdClose size={25} className='close-alert-btn' onClick={()=>setIsVisible(false)}/>
                    <div className='alert-content'>{message}</div>
                </div>
            </div>
            : null
    )
}

export default Alert