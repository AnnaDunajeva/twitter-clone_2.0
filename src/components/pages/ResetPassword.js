import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {PASSWORD_RESET} from '../../redux-store-2.0/constants'
import {resetPassword} from '../../redux-store-2.0/api/session'
import {getSessionFetchStatus} from '../../redux-store-2.0/session/selectors'
import {getUserIdFromCookie} from '../../utils/helpers'
import MainButtom from '../styles/MainButton'
import Form from '../styles/Form'
import EntityBackgroundContainer from '../styles/EntityBackgroundContainer'

const ResetPassword = (props) => {    
    const token = props.match.params.token
    const dispatch = useDispatch()
    const sessionStatus = useSelector(getSessionFetchStatus())
    const authedUserId = getUserIdFromCookie()

    const [password, setPassword] = useState('')
    
    const handleResetPassword = (e) => {
        e.preventDefault()
        dispatch(resetPassword({token, password}))
    }

    if (authedUserId) {
        return <Redirect to='/'/>
    }

    if (sessionStatus === PASSWORD_RESET) { //login will display reset password success message
        return <Redirect to='/login'/>
    }

    return (
        <React.Fragment>
            <EntityBackgroundContainer padding={'1% 7%'} margin={'4% auto 0 auto'}>
                <Form onSubmit={handleResetPassword} inputBorder shadow padding={'0 30px'}>
                    <h3>Enter your new password </h3>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                        />
                    </div>
                    <MainButtom
                        medium margin={'35px auto'} shadow
                        type='submit'
                        disabled={password === ''}>
                            Reset Password
                    </MainButtom>
                </Form>
            </EntityBackgroundContainer>
        </React.Fragment>
    )
}

export default ResetPassword


