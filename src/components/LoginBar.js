import React from 'react'
import { NavLink } from 'react-router-dom'

const LoginBar = () => {
    return (
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to='/login' activeClassName='active'>
                        Login | Sign Up
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default LoginBar