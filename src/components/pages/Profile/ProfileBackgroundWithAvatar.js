import React from 'react'

const ProfileBackgroundWithAvatar = ({user}) => {    
    return (
        <div 
            className='background-container' 
            style={{backgroundColor: user.backgroundColor}}>
            {user.backgroundImage && 
                <img 
                    src={user.backgroundImage} 
                    alt={`background for ${user.firstName}  ${user.lastName}`}
                    style={{width: '100%', maxWidth: '970px', height: '194px', objectFit: 'cover'}}/>
            }
            <div className='under-avatar'></div>
            <img 
                src={user.avatar} 
                alt={`Avatar for ${user.firstName}  ${user.lastName}`} 
                className='profile-avatar'/>
            <div className='profile-name'>
                {`${user.firstName}  ${user.lastName}`}
            </div>
        </div>
    )
}

export default ProfileBackgroundWithAvatar

