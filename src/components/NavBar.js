import React from 'react'
import { NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { handleLogOut } from '../redux-store/actions/authedUser'

const NavBar = () => {
    const authedUser = useSelector(state => state.authedUser)
    const dispatch = useDispatch()

    const logOut = async () => {
        const user = {
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('token')
        }
        await dispatch(handleLogOut(user))
    }
    if (!authedUser) {
        return <Redirect to='/login'/>
    }
    return (
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to='/' exact activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/newtweet' activeClassName='active'>
                        New Tweet
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/user/${authedUser}`} activeClassName='active'>
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/users' activeClassName='active'>
                        Discover
                    </NavLink>
                </li>
            </ul>
            <button onClick={logOut} className='btn-logout hover-blue'>
                Log Out
            </button>
        </nav>
    )
}

export default NavBar