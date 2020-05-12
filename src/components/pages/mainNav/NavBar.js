import React from 'react'
import {useSelector} from 'react-redux'
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

const NavBar = ({toggleTheme, theme}) => {
    const authedUser = useSelector(getAuthedUserId())
    const logOutUser = useLogOut()

    return (
        <MainNav data-test="component-navbar-main">
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
            <div><SearchBar/></div>
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