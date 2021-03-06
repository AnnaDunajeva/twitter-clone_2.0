import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group'
import { MdClose } from "react-icons/md"
import { getAuthedUserId } from '../../redux-store-2.0/session/selectors'
import SignInFormsContainer from '../styles/SingInFormsContainer'
import RequestResetPasswordLinkAlert from '../modals/RequestResetPasswordLinkAlert'
import RequestAccountVerificationLink from '../modals/RequestAccountVerificationLink'
import SignUp from '../utils/SignUp'
import Login from '../utils/Login'
import CompleteAccountCreationAfterOauthSignup from '../utils/CompleteAccountCreationAfterOauthSignup'
import { getOauthUserData } from '../../utils/helpers'
import Alert from '../modals/Alert'
import { URL } from '../../redux-store-2.0/constants'
import { dark } from '../styles/themes'
import EntityBackgroundContainer from '../styles/EntityBackgroundContainer'
import MainButton from '../styles/MainButton'
import IconButton from '../styles/IconButton'
import SignInNav from '../styles/SignInNav'
import Footer from '../styles/Footer'
import SignInPageContainer from '../styles/SignInPageContainer'
import BlurFilter from '../styles/BlurFilter'

const SignUpLogin = () => {
    const oauthUserData = getOauthUserData()
    const authedUser = useSelector(getAuthedUserId())   
    const [showLogin, setShowLogin] = useState(false)
    const [showSignUp, setShowSignUp] = useState(oauthUserData ? false : true)
    const [forgotPassword, setForgotPassword] = useState(false)
    const [requestAccountVerificationLink, setRequestAccountVerificationLink] = useState(false)
    const [formError, setFormError] = useState(null)
    const closeArea = useRef(null)

    //when user redirected back after successful oauth, cookie will be added and page reloads, so we dont need to
    //useeffect, because on component mount it will be there (exept if backed removes cookie when e.g token is expired)
    const [showOauthCompleteAccount, setShowOauthCompleteAccount] = useState(oauthUserData ? true : false)

    const handleCloseForm = (e) => {
        if (e.target === closeArea.current) {
            setShowLogin(false)
            setShowSignUp(false)
            setShowOauthCompleteAccount(false)
        }
    }
    const handleCloseBtn = () => {
        setShowLogin(false)
        setShowSignUp(false)
        setShowOauthCompleteAccount(false)
    }
    const handleShowSignUp = () => {
        setShowLogin(false)
        setShowSignUp(true)
        setShowOauthCompleteAccount(false)
    }
    const handleShowLogin = () => {
        setShowSignUp(false)
        setShowLogin(true)
        setShowOauthCompleteAccount(false)
    }

    if (authedUser) {
        return <Redirect to='/' />
    }
    
    return (
        <ThemeProvider theme={dark}>
            {formError && 
                <Alert 
                    message={formError} 
                    onClose={()=>setFormError(null)}/>}
            {forgotPassword && 
                <RequestResetPasswordLinkAlert 
                    onClose={() => setForgotPassword(false)}/>}
            {requestAccountVerificationLink && 
                <RequestAccountVerificationLink 
                    onClose={() => setRequestAccountVerificationLink(false)}/>}
            
            <SignInPageContainer 
                data-test="component-signuplogin">
                <BlurFilter blur={showLogin || showSignUp || (showOauthCompleteAccount && !!getOauthUserData())}>
                    <img src={`${URL}/background`}/>
                    {/* <Logo /> */}
                    <Footer>This is the best twitter clone out there!</Footer>
                </BlurFilter>
                <SignInFormsContainer 
                    onClick={(e)=>handleCloseForm(e)} 
                    ref={closeArea}>
                    <SignInNav>
                        <MainButton 
                            data-test='button-signup'
                            primary small margin={'7px 15px'} padding={'7px 15px'}
                            onClick={handleShowSignUp}>
                                Sign Up
                        </MainButton>
                        <MainButton 
                            data-test='button-login'
                            small margin={'7px'} padding={'7px 15px'}
                            onClick={handleShowLogin}>
                                Login
                        </MainButton>
                    </SignInNav>
                    <TransitionGroup component={null}>
                    {(showSignUp || showLogin || (showOauthCompleteAccount && !!getOauthUserData())) &&
                        <CSSTransition
                            timeout={300}
                            appear={true}
                            classNames='item'>
                                <EntityBackgroundContainer>
                                    <IconButton 
                                        onClick={(e)=>handleCloseBtn(e)}
                                        pale circle hoverOnDark size={'36px'} float={'right'}>
                                            <MdClose size={25}/>
                                    </IconButton>
                                    {(showOauthCompleteAccount && !!getOauthUserData()) && 
                                        <CompleteAccountCreationAfterOauthSignup 
                                            setFormError={setFormError}/>}
                                    {showLogin && 
                                        <Login 
                                            showForgotPassword={setForgotPassword} 
                                            setFormError={setFormError}/>}
                                    {showSignUp && 
                                        <SignUp 
                                            showRequestAccountVerificationLink={setRequestAccountVerificationLink} 
                                            setFormError={setFormError}/>}
                                </EntityBackgroundContainer>
                        </CSSTransition>
                    }
                    </TransitionGroup>
                </SignInFormsContainer>
            </SignInPageContainer>
        </ThemeProvider>
    )
}

export default SignUpLogin

