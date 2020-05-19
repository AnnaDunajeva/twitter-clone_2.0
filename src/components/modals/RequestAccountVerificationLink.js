import React, {useState, useEffect} from 'react'
import {ThemeProvider} from 'styled-components'
import { requestAccountVerificationLink as requestLink} from '../../redux-store-2.0/api/session'
import { useDispatch } from 'react-redux'
import {validateEmail} from '../../utils/helpers'
import {IoMdLock} from 'react-icons/io'
import MainButtom from '../styles/MainButton'
import {light} from '../styles/themes'
import Form from '../styles/Form'
import ModalWithHeaderAndCard from '../styles/ModalWithHeaderAndCard'

const RequestAccountVerificationLink = ({onClose}) => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()

    const handleClose = (e) => {
        e.preventDefault()
        if (onClose) {
            onClose()
        } 
    }
    const handleRequestdLink = (e) => {
        e.preventDefault()
        dispatch(requestLink(email))
        onClose()
    }

    useEffect(() => {
        return () => onClose() //cause it can be unmounted by parent component as well
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
                    <p>We will send account verification link to email adress you provide below.</p>
                    <Form onSubmit={handleRequestdLink} shadow inputBorder>
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
                            onClick={handleRequestdLink}
                            medium 
                            type='submit'
                            disabled={!validateEmail(email)}>
                                Get Link
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

export default RequestAccountVerificationLink