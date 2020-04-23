import React from 'react'
import ClearButton from '../../styles/ClearButton'
import NavLink from '../../utils/NavLink'
import ProfileNavStyled from '../../styles/ProfileNav'

const ProfileNav = ({url}) => {
    return (
        <ProfileNavStyled>
            {console.log('ProfileNav url ', url)}

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
