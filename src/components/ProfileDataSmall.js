import React, {useState, useCallback} from 'react'
import {formatJoinDate} from '../utils/helpers'
import { MdLocationOn } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"
import { FaUser, FaUsers } from 'react-icons/fa'
import {IoIosSettings} from "react-icons/io"
import {toggleUserFollow} from '../redux-store-2.0/api/users'
import {useDispatch, useSelector} from 'react-redux'
import useAuthedUserCredentials from '../Hooks/useAuthedUserCredentials'
import {useHistory} from 'react-router-dom'
import UsersList from './UsersList'
import ListPopUp from './ListPopUp'
import {getUserFollowersIds, getUserFollowingsIds} from '../redux-store-2.0/composite-data/selectors'
import {userFollowersKey, userFollowingsKey} from '../redux-store-2.0/utils/compositeDataStateKeys'
import {getUserFollowersPaginated, getUserFollowingsPaginated} from '../redux-store-2.0/api/users'

const ProfileDataSmall = ({user, isAuthedUser, setToUpdate, handleToProfile}) => {   
    const history = useHistory() 
    const dispatch = useDispatch()
    const userCredentials = useAuthedUserCredentials()

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowings, setShowFollowings] = useState(false)

    const followingsSelector = useCallback(getUserFollowingsIds(user.userId), [])
    const followersSelector = useCallback(getUserFollowersIds(user.userId), [])

    const dispatchData = {
        user: {
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('token')
        },
        userId: user.userId
    }

    const handleFollowUnfollow = async () => {
        console.log('about to handle following')
        const data = {
            ...userCredentials,
            userId: user.userId,
            following: user.following
        }
        await dispatch(toggleUserFollow(data)) 
    }

    return (
        <div className='profile-meta' style={{paddingBottom: '20px'}}>
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
                ?<IoIosSettings 
                    onClick={()=>setToUpdate(true)} 
                    className='clickable hover-blue profile-setting-wheel' 
                    size={35} 
                />
                :<div className='btn-follow-container' style={{float: 'right'}}>
                    <button 
                        className={`btn-usercard btn-${user.following ? 'unfollow' : 'follow'}`} 
                        onClick={handleFollowUnfollow}
                    > 
                        {user.following ? 'Unfollow' : "Follow"} 
                    </button>
                </div>
            }
            <div>
                <div className='profile-meta-text' style={{paddingBottom: '50px', height: '40px', paddingLeft: '140px'}}>
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
                <div style={{marginTop: '15px'}}>
                    <span className='profile-meta-text clickable hover-blue hover-blue-circle-background' onClick={()=>setShowFollowings(true)}>
                        <FaUsers className='profile-icon' size={22}/>
                        Following {user.followingsCount}
                    </span>
                    <span className='profile-meta-text clickable hover-blue hover-blue-circle-background' onClick={()=>setShowFollowers(true)}>
                        <FaUsers className='profile-icon' size={22}/>
                        Followers {user.followersCount}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProfileDataSmall

