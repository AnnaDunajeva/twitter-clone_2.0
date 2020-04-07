import React, {useState, useEffect} from 'react'
import {sendResetPasswordLink} from '../redux-store-2.0/api/session'
import { useDispatch } from 'react-redux'
import {validateEmail} from '../utils/helpers'
import {IoMdLock} from 'react-icons/io'

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
    }, [onClose])

    return (
        <div className='alert-container'>
            <div className='alert-box' style={{margin: '4% auto', width: '650px', padding: '0 0 20px 0'}}>
                <div className='alert-header'>
                    <IoMdLock size={50} style={{margin: '10px'}}/>
                    <p>Please enter your account email adress.</p>
                </div>
                <form onSubmit={handleRequestResetPasswordLink} className='alert-msg-container'>
                    <p style={{fontSize: '20px', color: 'rgb(102, 100, 100)'}}>
                        We will send password reset link to email adress you provide below.
                    </p>
                    <div className='alert-input-container'>
                        {/* <label htmlFor='email'>email</label> */}
                        <input 
                            placeholder={'your email...'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='text'
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <button 
                            type='submit'
                            disabled={!validateEmail(email)}
                            style={{width: '200px'}}
                            className='btn-usercard btn-follow alert-btn'>
                                Reset Password 
                        </button>
                        <button onClick={handleClose} className='btn-usercard btn-unfollow'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RequestResetPasswordLink