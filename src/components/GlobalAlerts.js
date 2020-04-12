import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Alert from './Alert'
import {
    SIGN_UP, 
    PASSWORD_RESET_LINK_SENT, 
    LOADED, 
    PASSWORD_RESET, 
    UPDATING, 
    UPDATED} from '../redux-store-2.0/constants'
import {setSessionFetchStatus} from '../redux-store-2.0/session/actions'
import {usersFetchStatusSet} from '../redux-store-2.0/entities/users/actions'
import {getUserStatusById} from '../redux-store-2.0/entities/users/selectors'
import {getAuthedUserId, getSessionFetchStatus} from '../redux-store-2.0/session/selectors'
import {getUserIdFromCookie} from '../utils/helpers'

const GlobalAlerts = () => {
    const dispatch = useDispatch()
    const sessionStatus = useSelector(getSessionFetchStatus()) 
    // const authedUserId = useSelector(getAuthedUserId())
    const authedUserId = getUserIdFromCookie()
    const userFetchStatus = useSelector(getUserStatusById(authedUserId))
    // const handleCloseResetPsswordLinkErrorAlert = () => {
    //     dispatch(globalErrorRemove(RESET_PASSWORD_LINK_ERROR))
    // }
    const handleCLoseUpdateDialog = () => {
        dispatch(usersFetchStatusSet({[authedUserId]: LOADED}))
    }
    return (
        <React.Fragment>
            {sessionStatus === SIGN_UP && 
                <Alert message={'Thank you! Please confirm your email adress to continue.'} 
                        smallMessage={'NB! confirmation link is valid for 15 min. If you do not confirm your account during 24 hours, it will be deleted. You can request new confirmation link if needed.'}/>}
            {sessionStatus === PASSWORD_RESET_LINK_SENT && 
                <Alert message={'We have sent reset password link to your email adress.'}
                        smallMessage={'NB! Link is valid for 15 minutes. If you do not reset your password during this period, your old password will remain valid.'}
                        onClose={()=>dispatch(setSessionFetchStatus(null))}/>}
            {sessionStatus === PASSWORD_RESET && 
                <Alert message={'Your password has been reset!'} 
                        smallMessage={'Please login to continue to your account.'}/>}
            {sessionStatus === LOADED+''+SIGN_UP && 
                <Alert message={'Welcome to the coolest twitter clone out there!!!'} 
                        smallMessage={'We hope you find tons of great content here <3'}/>}
            {userFetchStatus === UPDATING && 
                <Alert message={'Updating your information. It will take just a sec...'} closable={false}/>
            }
            {userFetchStatus === UPDATED && 
                <Alert message={'Profile updated!'} onClose={handleCLoseUpdateDialog}/>
            }
        </React.Fragment>           
    )
}

export default GlobalAlerts
