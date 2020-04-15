import React  from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {
    getSessionStartError, 
    getSignUpError, 
    getResetPasswordLinkError, 
    getProfileUpdateError,
    isAuthenticationError, 
    getToggleTweetLikeErrors,
    getPostTweetError,
    getDeleteTweetError,
    getSessionEndError,
    getUserToggleFollowErrors,
    getResetPasswordError} from '../../redux-store-2.0/errors/selectors'
import {

} from '../../redux-store-2.0/errors/actions'
import Alert from '../modals/Alert'
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
    const tweetToggleLikeErrors = useSelector(getToggleTweetLikeErrors())
    const postTweetError = useSelector(getPostTweetError())
    const deleteTweetError = useSelector(getDeleteTweetError())
    const logoutError = useSelector(getSessionEndError())
    const followUserErrors = useSelector(getUserToggleFollowErrors())

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
                <Alert message={'Oops, Could not update profile.'}  smallMessage={profileUpdateError}/>} 
            {authenticationError && //after this error store is cleared, so need after that to add error again to show it...
                <Alert message={'Authentication failed. Please login.'}/>}
            {tweetToggleLikeErrors.length !== 0 &&
                tweetToggleLikeErrors.map((errorMessage) => <Alert message={errorMessage} />) }
            {postTweetError &&
                <Alert message={'Oops, could not post tweet.'} smallMessage={postTweetError}/>}
            {deleteTweetError &&
                <Alert message={'Oops, could not delete tweet.'} smallMessage={deleteTweetError} /> }
            {followUserErrors.length !== 0 && 
                followUserErrors.map(error => <Alert message={'Oops, could not follow user.'} smallMessage={error}/>) }
            {logoutError &&
                <Alert message={logoutError} />}
            {
                //cookieError-403 forbidden
            }
            {
                //5xx status code - server error
            }
            {
                //404 status code
            }
        </React.Fragment>           
    )
}

export default GlobalErrors
