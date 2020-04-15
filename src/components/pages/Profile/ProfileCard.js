import React from 'react'
import ProfileBackgroundWithAvatar from './ProfileBackgroundWithAvatar'
import ProfileDataSmall from './ProfileDataSmall'
import {getUserIdFromCookie} from '../../../utils/helpers'

const ProfileCard = ({user, setToUpdate, handleToProfile}) => {
    const authedUser = getUserIdFromCookie()
    const isAuthedUser = user.userId === authedUser ? true : false
    
    return (
        <React.Fragment>
            <ProfileBackgroundWithAvatar user={user} />
            <ProfileDataSmall 
                user={user} 
                isAuthedUser={isAuthedUser} 
                setToUpdate={setToUpdate} 
                handleToProfile={handleToProfile}/>
        </React.Fragment>
    )
}

export default ProfileCard

