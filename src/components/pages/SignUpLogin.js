import React, { useState, useRef } from 'react'
import {Redirect} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import { getUserIdFromCookie} from '../../utils/helpers'
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

const SignUpLogin = () => {
    const authedUser = getUserIdFromCookie()
    const [showLogin, setShowLogin] = useState(false)
    const [showSignUp, setShowSignUp] = useState(true)
    const [forgotPassword, setForgotPassword] = useState(false)
    const [formError, setFormError] = useState(null)
    const closeArea = useRef(null)
    // const closeBtn = useRef(null)

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
            <ThemeProvider theme={light}>
                {formError && 
                    <Alert message={formError} onClose={()=>setFormError(null)}/>}
                {forgotPassword && 
                    <RequestResetPasswordLinkAlert onClose={() => setForgotPassword(false)}/>}
            </ThemeProvider>
            <div style={{height: '100vh'}}>
                <img 
                    // style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    style={{width: '100%', height: '100%', objectFit: 'cover', transition: '0.2s filter', filter: `blur(${showLogin || showSignUp ? '10px' : '0px'})`}}
                    src={`${URL}/background`}/>
                {/* <Logo /> */}
                <SignInFormsContainer onClick={(e)=>handleCloseForm(e)} ref={closeArea}>
                    <SignInNav>
                        <MainButton primary small onClick={handleShowSignUp} margin={'7px 15px'} padding={'7px 15px'}>Sign Up</MainButton>
                        <MainButton small onClick={handleShowLogin} margin={'7px'} padding={'7px 15px'}>Login</MainButton>
                    </SignInNav>
                    <TransitionGroup component={null}>
                    {(showSignUp || showLogin) &&
                        <CSSTransition
                            // in={(showSignUp || showLogin)}
                            timeout={300}
                            appear={true}
                            // unmountOnExit
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
                    <Footer>This is best twitter clone out there!</Footer>
                </SignInFormsContainer>
            </div>
        </ThemeProvider>
    )
}

export default SignUpLogin


// import React, {useState} from 'react'
// import {useDispatch} from 'react-redux'
// import {Redirect} from 'react-router-dom'
// import {ThemeProvider} from 'styled-components'
// import {signUp, login} from '../../redux-store-2.0/api/session'
// import {validateEmail, getUserIdFromCookie, isValidFisrtOrLastname, isValidUsername} from '../../utils/helpers'
// import Alert from '../modals/Alert'
// import RequestResetPasswordLinkAlert from '../modals/RequestResetPasswordLinkAlert'
// import MainButton from '../styles/MainButton'
// import ClearButton from '../styles/ClearButton'
// import Link from '../styles/Link'
// import Form from '../styles/Form'
// import {light, dark} from '../styles/themes'
// import AnimatedGradient from '../styles/AnimatedGradient'
// import SignInFormsContainer from '../styles/SingInFormsContainer'
// import Logo from '../utils/MainHeaderLogo'

// const SignUpLogin = () => {
//     const authedUser = getUserIdFromCookie()
//     const dispatch = useDispatch()

//     const [username, setUsername] = useState('')
//     const [firstName, setFirstName] = useState('')
//     const [lastName, setLastName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [formError, setFormError] = useState(null)

//     const [loginUsername, setLoginUsername] = useState('')
//     const [loginPassword, setLoginPassword] = useState('')

//     const [forgotPassword, setForgotPassword] = useState(false)

//     const SignUpUser = async (e) => {
//         e.preventDefault()

//         if (!isValidUsername(username)) {
//             setFormError('You can only use in your username alphabetic characters, numbers, "-" or "_".')
//             return
//         }
//         if (!isValidFisrtOrLastname(firstName)) {
//             setFormError('You can only use alphabetic characters and "-" in your name.')
//             return
//         }
//         if (!isValidFisrtOrLastname(lastName)) {
//             setFormError('You can only use alphabetic characters and "-" in your name.')
//             return
//         }

//         if (!validateEmail(email)) {
//             setFormError('Provided email adress is invalid!')
//             return
//         }
//         if (password.length < 6) {
//             setFormError('Password should be at least 6 characters long.')
//             return
//         }

//         const user = {
//             userId: username.toLowerCase().trim(),
//             firstName: firstName.trim(),
//             lastName: lastName.trim(),
//             password: password,
//             email: email.trim()
//         }

//         await dispatch(signUp(user))
//     }

//     const LoginUser = async (e) => {
//         e.preventDefault()
//         const user = {
//             userId: loginUsername.toLowerCase().trim(),
//             password: loginPassword
//         }
//         if (loginUsername.length !== 0 && loginPassword.length !== 0) {
//             await dispatch(login(user))
//         }
//     }

//     if (authedUser) {
//         return <Redirect to='/' />
//     }
//     //in case if email confirmation error will be redirected here with login error
//     return (
//         <ThemeProvider theme={dark}>
//             <AnimatedGradient>
//                 <Logo />
//                 <SignInFormsContainer>
//                     {console.log('rendering signup')}

//                     <ThemeProvider theme={light}>
//                         {forgotPassword && 
//                             <RequestResetPasswordLinkAlert onClose={() => setForgotPassword(false)}/>}
//                         {formError && 
//                             <Alert message={formError} onClose={()=>setFormError(null)}/>}
//                     </ThemeProvider>

//                     <Form onSubmit={LoginUser} noInputBorder shadow inputShadow={'mediumDarkShadow'} labelColor={'mediumLightGrey'}>
//                         <h3>Login </h3>
//                             <div>
//                             <label htmlFor='loginUsername'>Username</label>
//                             <input 
//                                 value={loginUsername}
//                                 onChange={(e) => setLoginUsername(e.target.value)}
//                                 type='text'/>
//                             <label htmlFor='loginPassword'>Password</label>
//                             <input 
//                                 value={loginPassword}
//                                 onChange={(e) => setLoginPassword(e.target.value)}
//                                 type='password'/>
//                         </div>
//                         <ThemeProvider theme={light}>
//                             <MainButton
//                                 mediumSmall blue disabledMediumLight shadow uppercase margin={'20px auto'}
//                                 type='submit'
//                                 disabled={loginUsername === '' || loginPassword === ''}>
//                                     Login
//                             </MainButton>
//                         </ThemeProvider>
//                         <Link onClick={()=>setForgotPassword(true)}>
//                             Forgot password?
//                         </Link>
//                     </Form>

//                     {/* separator line */}
//                     <div></div>

//                     <Form onSubmit={SignUpUser} noInputBorder inputWidth={'300px'} shadow inputShadow={'mediumDarkShadow'} labelColor={'mediumLightGrey'}>
//                         <h3>Sign Up</h3>
//                         <div>
//                             <label htmlFor='username'>Username</label>
//                             <input 
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 type='text'/>
//                             <label htmlFor='firstName'>First Name</label>
//                             <input 
//                                 value={firstName}
//                                 onChange={(e) => setFirstName(e.target.value)}
//                                 type='text'/>
//                             <label htmlFor='lastName'>Last Name</label>
//                             <input 
//                                 value={lastName}
//                                 onChange={(e) => setLastName(e.target.value)}
//                                 type='text'/>
//                             <label htmlFor='password'>Password</label>
//                             <input 
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 type='password'/>
//                             <label htmlFor='email'>e-mail</label>
//                             <input 
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 type='text'/>
//                         </div>
//                         <ThemeProvider theme={light}>
//                             <MainButton
//                                 mediumSmall blue disabledMediumLight shadow uppercase margin={'10px auto'}
//                                 type='submit'
//                                 disabled={username === '' || firstName === '' || lastName === '' || password === '' || email === ''}>
//                                     Sign Up
//                             </MainButton>
//                         </ThemeProvider>
//                     </Form>
//                 </SignInFormsContainer>
//             </AnimatedGradient>
//         </ThemeProvider>
//     )
// }

// export default SignUpLogin