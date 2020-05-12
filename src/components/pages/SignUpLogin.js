import React, { useState, useRef } from 'react'
import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {ThemeProvider} from 'styled-components'
// import { getUserIdFromCookie} from '../../utils/helpers'
import {getAuthedUserId} from '../../redux-store-2.0/session/selectors'
import AnimatedGradient from '../styles/AnimatedGradient'
import SignInFormsContainer from '../styles/SingInFormsContainer'
import RequestResetPasswordLinkAlert from '../modals/RequestResetPasswordLinkAlert'
import Logo from '../utils/MainHeaderLogo'
import SignUp from '../utils/SignUp'
import Login from '../utils/Login'
import Alert from '../modals/Alert'
import {URL} from '../../redux-store-2.0/constants'
import {light, dark} from '../styles/themes'
import EntityBackgroundContainer, {} from '../styles/EntityBackgroundContainer'
import MainButton from '../styles/MainButton'
import {MdClose} from "react-icons/md"
import IconButton from '../styles/IconButton'
import SignInNav from '../styles/SignInNav'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import Footer from '../styles/Footer'
import SignInPageContainer from '../styles/SignInPageContainer'
import BlurFilter from '../styles/BlurFilter'

const SignUpLogin = () => {
    const authedUser = useSelector(getAuthedUserId())   
    const [showLogin, setShowLogin] = useState(false)
    const [showSignUp, setShowSignUp] = useState(true)
    const [forgotPassword, setForgotPassword] = useState(false)
    const [formError, setFormError] = useState(null)
    const closeArea = useRef(null)

    const handleCloseForm = (e) => {
        if (e.target === closeArea.current) {
            setShowLogin(false)
            setShowSignUp(false)
        }
    }
    const handleCloseBtn = () => {
        setShowLogin(false)
        setShowSignUp(false)
    }
    const handleShowSignUp = () => {
        setShowLogin(false)
        setShowSignUp(true)
    }
    const handleShowLogin = () => {
        setShowSignUp(false)
        setShowLogin(true)
    }

    if (authedUser) {
        return <Redirect to='/' />
    }
    //in case if email confirmation error will be redirected here with login error
    
    return (
        <ThemeProvider theme={dark}>
            {formError && 
                <Alert message={formError} onClose={()=>setFormError(null)}/>}
            {forgotPassword && 
                <RequestResetPasswordLinkAlert onClose={() => setForgotPassword(false)}/>}
            <SignInPageContainer data-test="component-signin">
                <BlurFilter blur={showLogin || showSignUp}>
                    <img 
                        src={`${URL}/background`}/>
                    {/* <Logo /> */}
                </BlurFilter>
                <SignInFormsContainer onClick={(e)=>handleCloseForm(e)} ref={closeArea}>
                    <SignInNav>
                        <MainButton primary small onClick={handleShowSignUp} margin={'7px 15px'} padding={'7px 15px'}>Sign Up</MainButton>
                        <MainButton small onClick={handleShowLogin} margin={'7px'} padding={'7px 15px'}>Login</MainButton>
                    </SignInNav>
                    <TransitionGroup component={null}>
                    {(showSignUp || showLogin) &&
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
                                    {showLogin && 
                                        <Login showForgotPassword={setForgotPassword} setFormError={setFormError}/>}
                                    {showSignUp && 
                                        <SignUp setFormError={setFormError}/>}
                                </EntityBackgroundContainer>
                        </CSSTransition>
                    }
                    </TransitionGroup>
                </SignInFormsContainer>
            </SignInPageContainer>
            <Footer>This is the best twitter clone out there!</Footer>
        </ThemeProvider>
    )
}
SignUpLogin.whyDidYouRender = true
export default SignUpLogin

