import React  from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {
    getSessionStartError, 
    getSignUpError, 
    getResetPasswordLinkError, 
    getProfileUpdateError,
    isAuthenticationError, 
    getResetPasswordError} from '../redux-store-2.0/errors/selectors'
import Alert from './Alert'
// import {RESET_PASSWORD_LINK_ERROR} from '../redux-store-2.0/action-types'
// import {globalErrorRemove} from '../redux-store-2.0/errors/actions'

const GlobalErrors = () => {
    // const dispatch = useDispatch()
    const history = useHistory()
    const loginError = useSelector(getSessionStartError())
    const signUpError = useSelector(getSignUpError())
    const resetPasswordLinkError = useSelector(getResetPasswordLinkError())
    const profileUpdateError = useSelector(getProfileUpdateError())
    const resetPasswordError = useSelector(getResetPasswordError())
    const authenticationError = useSelector(isAuthenticationError())

    // const handleCloseResetPsswordLinkErrorAlert = () => {
    //     dispatch(globalErrorRemove(RESET_PASSWORD_LINK_ERROR))
    // }

    return (
        <React.Fragment>
            {loginError && 
                <Alert message={loginError}/>} 
            {signUpError && 
                <Alert message={signUpError}/>}
            {resetPasswordLinkError && 
                <Alert message={resetPasswordLinkError}/>}      
            {resetPasswordError && 
                <Alert message={resetPasswordError} onClose={() => history.push('/')}/> }
            {profileUpdateError && 
                <Alert message={`Oops, Could not update profile. ${profileUpdateError}`} />} 
            {authenticationError && //after this error store is cleared, so need after that to add error again to show it...
                <Alert message={'Authentication failed. Please log in.'}/>}
        </React.Fragment>           
    )
}

export default GlobalErrors
