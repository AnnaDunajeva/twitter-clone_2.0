import React from 'react'
// import { NavLink } from 'react-router-dom'
import ClearButton from '../../styles/ClearButton'
import NavLink from '../../utils/NavLink'
import ProfileNavStyled from '../../styles/ProfileNav'

const ProfileNav = ({url}) => {
    return (
        <ProfileNavStyled>
            {console.log('ProfileNav url ', url)}
            {/* <NavLink to={`${url}`} exact activeClassName='active' className='header'>
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
            </NavLink> */}

            <ClearButton as={NavLink} to={`${url}`} exact hoverOnDark fontsize={'largeFont'} margin={'10px 30px'}>
                Tweets
            </ClearButton>
            <ClearButton as={NavLink} to={`${url}/replies`} hoverOnDark fontsize={'largeFont'} margin={'10px 30px'}>
                Replies
            </ClearButton>
            <ClearButton as={NavLink} to={`${url}/likes`} hoverOnDark fontsize={'largeFont'} margin={'10px 30px'}>
                Likes
            </ClearButton>
            <ClearButton as={NavLink} to={`${url}/photos`} hoverOnDark fontsize={'largeFont'} margin={'10px 30px'}>
                Photos
            </ClearButton>
            </ProfileNavStyled>
    )
}

export default ProfileNav
