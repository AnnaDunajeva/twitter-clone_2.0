import React from 'react'
import { NavLink } from 'react-router-dom'

const ProfileNav = ({url}) => {
    return (
        <nav className='profile-nav'>
            {console.log('ProfileNav url ', url)}
            <NavLink to={`${url}`} exact activeClassName='active' className='header'>
                Tweets
            </NavLink>
            <NavLink to={`${url}/replies`} activeClassName='active' className='header'>
                Replies
            </NavLink>
            <NavLink to={`${url}/likes`} activeClassName='active' className='header'>
                Likes
            </NavLink>
            <NavLink to={`${url}/photos`} activeClassName='active' className='header'>
                Photos
            </NavLink>
        </nav>
    )
}

export default ProfileNav
