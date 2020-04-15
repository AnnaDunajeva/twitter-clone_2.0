import React from 'react'
import { NavLink } from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import useLogOut from '../../../Hooks/useLogOut'
import {getUserIdFromCookie} from '../../../utils/helpers'

const NavBar = () => {
    const authedUser = getUserIdFromCookie()
    const logOutUser = useLogOut()

    if (!authedUser) {
        return <Redirect to='/login'/>
    }
    return (
        <nav className='nav'>
            <div>
                <NavLink to='/' exact activeClassName='active'>
                    Home
                </NavLink>
                <NavLink to={`/user/${authedUser}`} activeClassName='active'>
                    Profile
                </NavLink>
                <NavLink to='/users' activeClassName='active'>
                    Discover
                </NavLink>
            </div>
            <button onClick={logOutUser} className='btn-logout hover-blue'>
                Log Out
            </button>
        </nav>
    )
}

export default NavBar