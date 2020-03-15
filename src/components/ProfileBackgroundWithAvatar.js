import React, { useMemo } from 'react'

const ProfileBackgroundWithAvatar = ({user}) => {    
    return (
        <div className='background-container' style={{backgroundColor: user.backgroundColor}}>
            {user.backgroundImage && 
                <img src={user.backgroundImage} style={{height: '100%'}}/>
            }
            <div className='under-avatar'></div>
            <img src={user.avatar} alt={`Avatar for ${user.firstName}  ${user.lastName}`} className='profile-avatar'/>
            <div className='profile-name'>{`${user.firstName}  ${user.lastName}`}</div>
        </div>
    )
}

export default ProfileBackgroundWithAvatar

