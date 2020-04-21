import React from 'react'
import useLogOut from '../../../Hooks/useLogOut'
import {getUserIdFromCookie} from '../../../utils/helpers'
import SearchBar from '../../utils/SearchBar'
import ClearButton from '../../styles/ClearButton'
import NavLink from '../../utils/NavLink'
import MainNav from '../../styles/MainNav'

const NavBar = () => {
    const authedUser = getUserIdFromCookie()
    const logOutUser = useLogOut()

    return (
        <MainNav>
            <div>
                <ClearButton as={NavLink} to='/' exact size={'90px'} fontSize={'mediumFont'} margin={'0 5px 0 0'}>
                    Home
                </ClearButton>
                <ClearButton as={NavLink} to={`/user/${authedUser}`} size={'90px'} fontSize={'mediumFont'} margin={'0 5px 0 0'}>
                    Profile
                </ClearButton>
                <ClearButton as={NavLink} to='/users' size={'110px'} fontSize={'mediumFont'} margin={'0 5px 0 0'}>
                    Discover
                </ClearButton>

            </div>
            <div>
                <SearchBar/>
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