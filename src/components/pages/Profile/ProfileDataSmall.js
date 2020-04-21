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
        <EntityBackgroundContainer profile={'true'}>
            {showFollowers && user.followersCount !== 0 &&
                <ListPopUp 
                    header={'Followers'}
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
                </ListPopUp>
            }
            {showFollowings && user.followingsCount !== 0 &&
                <ListPopUp
                    header={"Followings"}
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
                </ListPopUp>
            }
            {isAuthedUser
                ?<IconButton 
                    onClick={()=>setToUpdate(true)} 
                    size={'50px'} pale circle hoverOnDark float={'right'}>
                        <IoIosSettings size={35}/>
                </IconButton>
                :<div className='btn-follow-container' style={{float: 'right'}}>
                    {user.following 
                        ? <MainButton 
                            onClick={handleFollowUnfollow} 
                            small primary margin={'15px auto'}>
                                Unfollow
                        </MainButton>
                        :<MainButton 
                            onClick={handleFollowUnfollow} 
                            small secondary margin={'15px auto'}>
                                Follow
                        </MainButton>
                    }
                </div>
            }
            <div>
                <div className='profile-meta-text' style={{marginTop: '0', height: '55px', paddingLeft: '140px'}}>
                    {user.description}
                </div>
                <span className='profile-meta-text'>
                    <FaUser className='profile-icon' size={22}/>
                    @{user.userId}
                </span>
                <span className='profile-meta-text'>
                    <IoMdCalendar className='profile-icon' size={22}/>
                    Joined {formatJoinDate(user.createdAt)}
                </span>
                {user.location &&
                    <span className='profile-meta-text'>
                        <MdLocationOn className='profile-icon' size={22}/>
                        {user.location}
                    </span>
                }
                <div style={{marginTop: '15px', display: 'flex'}}>
                    <IconButton
                        fontSize={'mediumFont'} margin={'0 15px'} padding={'10px 15px'}
                        onClick={()=>setShowFollowings(true)}>
                            <FaUsers className='profile-icon' size={22}/>
                            Following {user.followingsCount}
                    </IconButton>
                    <IconButton
                        fontSize={'mediumFont'} padding={'10px 15px'}
                        onClick={()=>setShowFollowers(true)}>
                            <FaUsers className='profile-icon' size={22}/>
                            Followers {user.followersCount}
                    </IconButton>
                </div>
            </div>
        </EntityBackgroundContainer>
    )
}

export default ProfileDataSmall

