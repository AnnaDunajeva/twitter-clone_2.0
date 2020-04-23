import React from 'react'
import ProfileBackgroundAndAvatarStyled from '../../styles/ProfileBackgroundAndAvatar'

const ProfileBackgroundWithAvatar = ({user}) => {    
    return (
        <ProfileBackgroundAndAvatarStyled 
            style={{backgroundColor: user.backgroundColor}}>
            {user.backgroundImage && 
            <img 
                src={user.backgroundImage} 
                alt={`background for ${user.firstName}  ${user.lastName}`}/>
            }
            {/* under avatar */}
            <div>
            </div>
            <img 
                src={user.avatar} 
                alt={`Avatar for ${user.firstName}  ${user.lastName}`} />
            <h3>
                {`${user.firstName}  ${user.lastName}`}
            </h3>
        </ProfileBackgroundAndAvatarStyled>
    )
}

export default ProfileBackgroundWithAvatar

