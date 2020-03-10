import React from 'react'
import { NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {logOut} from '../redux-store-2.0/api/session'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'

const NavBar = () => {
    const authedUser = useSelector(getAuthedUserId())
    const dispatch = useDispatch()

    const logOutUser = async () => {
        const user = {
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('token')
        }
        await dispatch(logOut(user))
    }
    if (!authedUser) {
        return <Redirect to='/login'/>
    }
    return (
        <nav className='nav'>
            <div>
                <NavLink to='/' exact activeClassName='active'>
                    Home
                </NavLink>
            {/* <li>
                <NavLink to='/newtweet' activeClassName='active'>
                    New Tweet
                </NavLink>
            </li> */}
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