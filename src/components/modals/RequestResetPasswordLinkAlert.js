import React, {useState, useEffect} from 'react'
import {ThemeProvider} from 'styled-components'
import {sendResetPasswordLink} from '../../redux-store-2.0/api/session'
import { useDispatch } from 'react-redux'
import {validateEmail} from '../../utils/helpers'
import {IoMdLock} from 'react-icons/io'
import MainButtom from '../styles/MainButton'
import {light, dark} from '../styles/themes'
import Form from '../styles/Form'
import ModalWithHeaderAndCard from '../styles/ModalWithHeaderAndCard'

const RequestResetPasswordLink = ({onClose}) => {
    const [email, setEmail] = useState('')
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
        onClose()
    }

    useEffect(() => {
        return () => onClose() //cause it can be closed by parent component as well
    }, [onClose])

    return (
        <ThemeProvider theme={light} >
        <ModalWithHeaderAndCard>
            <div >
                <h3>
                    <IoMdLock size={50} style={{margin: '10px'}}/>
                    <p>Please enter your account email adress.</p>
                </h3>
                <div>
                    <p>We will send password reset link to email adress you provide below.</p>
                    <Form onSubmit={handleRequestResetPasswordLink} shadow inputBorder>
                        <div>
                            <input 
                                placeholder={'your email...'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type='text'
                            />
                        </div>
                    </Form>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <MainButtom 
                            onClick={handleRequestResetPasswordLink}
                            medium 
                            type='submit'
                            disabled={!validateEmail(email)}>
                                Reset Password
                        </MainButtom>
                        <MainButtom 
                            onClick={handleClose}
                            primary small>
                                Cancel
                        </MainButtom>
                    </div>
                </div>
            </div>
        </ModalWithHeaderAndCard>
        </ThemeProvider>
    )
}

export default RequestResetPasswordLink