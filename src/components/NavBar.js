import React from 'react'
import { NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import useLogOut from '../Hooks/useLogOut'

const NavBar = () => {
    const authedUser = useSelector(getAuthedUserId())
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