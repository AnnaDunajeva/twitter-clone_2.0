import React from 'react'

const ProfileBackgroundWithAvatar = ({user}) => {    
    return (
        <div className='background-container' style={{backgroundColor: user.backgroundColor}}>
            <div className='under-avatar'></div>
            <img src={user.avatarURL || 'https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png'} alt={`Avatar for ${user.firstName}  ${user.lastName}`} className='profile-avatar'/>
            <div className='profile-name'>{`${user.firstName}  ${user.lastName}`}</div>
        </div>
    )
}

export default ProfileBackgroundWithAvatar

