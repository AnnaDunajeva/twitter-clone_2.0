import React from 'react'
import ProfileBackgroundAndAvatarStyled from '../../styles/ProfileBackgroundAndAvatar'
import useWindowSize from '../../../Hooks/useWindowSize'
import {truncateText} from '../../../utils/helpers'

const ProfileBackgroundWithAvatar = ({user}) => {    
    const {width} = useWindowSize()
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
                {`${user.firstName}  ${user.lastName}`.length > 27 && width < 801 
                ?truncateText(`${user.firstName}  ${user.lastName}`, 24)
                :`${user.firstName}  ${user.lastName}`
                }
            </h3>
        </ProfileBackgroundAndAvatarStyled>
    )
}

export default ProfileBackgroundWithAvatar

