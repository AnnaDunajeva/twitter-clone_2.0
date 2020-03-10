import React from 'react'

const ProfileBackgroundWithAvatar = ({user}) => {    
    return (
        <div className='background-container'>
            <div className='under-avatar'></div>
            <img src={user.avatarURL} alt={`Avatar for ${user.firstName}  ${user.lastName}`} className='profile-avatar'/>
            <div className='profile-name'>{`${user.firstName}  ${user.lastName}`}</div>
        </div>
    )
}

export default ProfileBackgroundWithAvatar

