import React from 'react'
import { useSelector } from 'react-redux'
import ProfileBackgroundWithAvatar from './ProfileBackgroundWithAvatar'
import ProfileDataSmall from './ProfileDataSmall'
import {getAuthedUserId} from '../../../redux-store-2.0/session/selectors'

const ProfileCard = ({user, setToUpdate, handleToProfile}) => {
    const authedUser = useSelector(getAuthedUserId())
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

