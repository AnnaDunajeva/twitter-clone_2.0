import React, {useState, useEffect} from 'react'
import {sendResetPasswordLink} from '../redux-store-2.0/api/session'
import { useDispatch } from 'react-redux'
import {validateEmail} from '../utils/helpers'

const RequestResetPasswordLink = ({onClose}) => {
    const [email, setEmail] = useState('')
    const [formError, setFormError] = useState(null)
    const dispatch = useDispatch()

    const handleClose = (e) => {
        e.preventDefault()
        if (onClose) {
            onClose()
        } 
    }
    const handleRequestResetPasswordLink = (e) => {
        e.preventDefault()
        dispatch(sendResetPasswordLink(email))
    }

    useEffect(() => {
        return () => onClose() //cause it can be closed by parent component as well
    }, [])

    return (
        <div className='alert-container'>
            <div className='alert-box'>
                <div className='alert-content'>
                    <form onSubmit={handleRequestResetPasswordLink} >
                        <h3>Please enter your account email adress.</h3>
                        <p>We will send password reset link to email adress you provide below.</p>
                        <div >
                            <label htmlFor='email'>email</label>
                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type='text'
                            />
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <button 
                                type='submit'
                                disabled={!validateEmail(email)}
                                className='btn-usercard btn-follow'>
                                    Reset Password 
                            </button>
                            <button onClick={handleClose} className='btn-usercard btn-unfollow'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RequestResetPasswordLink