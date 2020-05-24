import React, {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import useLogOut from '../../../Hooks/useLogOut'
// import {getUserIdFromCookie} from '../../../utils/helpers'
import {getAuthedUserId} from '../../../redux-store-2.0/session/selectors'
import SearchBar from '../../utils/SearchBar'
import ClearButton from '../../styles/ClearButton'
import NavLink from '../../utils/NavLink'
import MainNav from '../../styles/MainNav'
import {WiDaySunny} from 'react-icons/wi'
import {FaRegMoon} from 'react-icons/fa'
import IconButton from '../../styles/IconButton'
import useScrollY from '../../../Hooks/useScrollY'

const NavBar = ({toggleTheme, theme}) => {
    const authedUser = useSelector(getAuthedUserId())
    const logOutUser = useLogOut()
    const scrollY = useScrollY()
    const windowWidth = useRef(window.innerWidth)
    const [showSearchBar, setShowSearchBar] = useState(scrollY < 99 || windowWidth.current > 500)

    useEffect(() => {
        if (windowWidth.current < 501 && scrollY > 100 && showSearchBar) {
            setShowSearchBar(false)
        } else if (windowWidth.current < 501 && scrollY < 50) {
            setShowSearchBar(true)
        }
    }, [scrollY, showSearchBar])

    return (
        <MainNav data-test="component-navbar-main" searchBarShown={showSearchBar}>
            <div>
                <ClearButton as={NavLink} to='/' exact size={'90px'} fontSize={'mediumFont'} margin={'0 10px 0 0'}>
                    Home
                </ClearButton>
                <ClearButton as={NavLink} to={`/user/${authedUser}`} size={'90px'} fontSize={'mediumFont'} margin={'0 10px 0 0'}>
                    Profile
                </ClearButton>
                <ClearButton as={NavLink} to='/users' size={'110px'} fontSize={'mediumFont'} margin={'0 10px 0 0'}>
                    Discover
                </ClearButton>

            </div>
            <TransitionGroup component={null}>
                {showSearchBar && 
                    <CSSTransition
                        timeout={200}
                        classNames='item'>
                            <div className='search-bar-container'><SearchBar/></div>
                    </CSSTransition>
                }
            </TransitionGroup>
            <div>
                {theme === 'light'
                ?<IconButton onClick={(e)=>toggleTheme(e)} circle size={'40px'} margin={'0 10px'}><FaRegMoon size={24}/></IconButton>
                :<IconButton onClick={(e)=>toggleTheme(e)} circle size={'40px'} margin={'0 10px'}><WiDaySunny size={31}/></IconButton>}
                <ClearButton
                    bold uppercase fontSize={'mediumFont'}
                    onClick={logOutUser}>
                        Log Out
                </ClearButton>
            </div>
        </MainNav>
    )
}

export default NavBar