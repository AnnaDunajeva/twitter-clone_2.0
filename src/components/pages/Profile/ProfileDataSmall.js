import React, {useState, useCallback} from 'react'
import { MdLocationOn } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"
import { FaUser, FaUsers } from 'react-icons/fa'
import {IoIosSettings} from "react-icons/io"
import {useDispatch} from 'react-redux'
import UsersList from '../../lists/UsersList'
import ListPopUp from '../../modals/ListPopUp'
import {formatJoinDate} from '../../../utils/helpers'
import {getUserFollowersIds, getUserFollowingsIds} from '../../../redux-store-2.0/composite-data/selectors'
import {userFollowersKey, userFollowingsKey} from '../../../redux-store-2.0/utils/compositeDataStateKeys'
import {getUserFollowersPaginated, getUserFollowingsPaginated} from '../../../redux-store-2.0/api/users'
import {toggleUserFollow} from '../../../redux-store-2.0/api/users'
import ClearButton from '../../styles/ClearButton'
import MainButton from '../../styles/MainButton'
import IconButton from '../../styles/IconButton'
import EntityBackgroundContainer from '../../styles/EntityBackgroundContainer'
import ProfileMetaData from '../../styles/ProfileMetaData'

const ProfileDataSmall = ({
    user, 
    isAuthedUser, 
    setToUpdate, 
    handleToProfile
}) => {   
    const dispatch = useDispatch()

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowings, setShowFollowings] = useState(false)

    const followingsSelector = useCallback(getUserFollowingsIds(user.userId), [])
    const followersSelector = useCallback(getUserFollowersIds(user.userId), [])

    const dispatchData = {
        userId: user.userId
    }

    const handleFollowUnfollow = async () => {
        console.log('about to handle following')
        const data = {
            userId: user.userId,
            following: user.following
        }
        await dispatch(toggleUserFollow(data)) 
    }

    return (
        <EntityBackgroundContainer profile={'true'} padding={'20px 20px 5px 20px'}>
            {showFollowers && user.followersCount !== 0 &&
            <ListPopUp 
                header={'Followed by'}
                id={userFollowersKey(user.userId)}
                key={userFollowersKey(user.userId)}
                onClose={()=>setShowFollowers(false)}>
                <UsersList 
                    key={userFollowersKey(user.userId)}
                    handleToProfile={handleToProfile}
                    stateKey={userFollowersKey(user.userId)}
                    stateSelector={followersSelector}
                    dispatchData={dispatchData}
                    scrollableTarget={userFollowersKey(user.userId)}
                    showFollowButton={isAuthedUser}
                    getDataFetch={getUserFollowersPaginated}/>
            </ListPopUp>}
            
            {showFollowings && user.followingsCount !== 0 &&
            <ListPopUp
                header={"Following"}
                id={userFollowingsKey(user.userId)}
                key={userFollowingsKey(user.userId)}
                onClose={()=>setShowFollowings(false)}>
                <UsersList 
                    key={userFollowingsKey(user.userId)}
                    handleToProfile={handleToProfile}
                    stateKey={userFollowingsKey(user.userId)}
                    stateSelector={followingsSelector}
                    dispatchData={dispatchData}
                    scrollableTarget={userFollowingsKey(user.userId)}
                    getDataFetch={getUserFollowingsPaginated}/>
            </ListPopUp>}

            {isAuthedUser
            ?<IconButton 
                onClick={()=>setToUpdate(true)} 
                size={'50px'} pale circle hoverOnDark float={'right'}>
                    <IoIosSettings size={35}/>
            </IconButton>
            :<React.Fragment>
                {user.following 
                    ? <MainButton 
                        onClick={handleFollowUnfollow} 
                        small primary margin={'15px auto'} float={'right'}>
                            Unfollow
                    </MainButton>
                    :<MainButton 
                        onClick={handleFollowUnfollow} 
                        small secondary margin={'15px auto'} float={'right'}>
                            Follow
                    </MainButton>}
            </React.Fragment>}

            <ProfileMetaData> 
                <div>{user.description}</div>
                <span> <FaUser size={22}/>@{user.userId}</span>
                <span><IoMdCalendar size={22}/>Joined {formatJoinDate(user.createdAt)}</span>
                {user.location &&
                <span><MdLocationOn size={22}/>{user.location}</span>}
                
                <div>
                    <IconButton
                        onClick={()=>setShowFollowings(true)}>
                            <FaUsers size={22}/>
                            Following {user.followingsCount}
                    </IconButton>
                    <IconButton
                        onClick={()=>setShowFollowers(true)}>
                            <FaUsers size={22}/>
                            Followers {user.followersCount}
                    </IconButton>
                </div>
            </ProfileMetaData>
        </EntityBackgroundContainer>
    )
}

export default ProfileDataSmall

