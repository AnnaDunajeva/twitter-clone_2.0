import React from 'react'
import {formatJoinDate} from '../utils/helpers'
import { MdLocationOn } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"
import { FaUser, FaUsers } from 'react-icons/fa'
import {IoIosSettings} from "react-icons/io"
import {toggleUserFollow} from '../redux-store-2.0/api/users'
import {useDispatch} from 'react-redux'
import useAuthedUserCredentials from '../Hooks/useAuthedUserCredentials'
import {useHistory} from 'react-router-dom'

const ProfileDataSmall = ({user, isAuthedUser, setToUpdate}) => {   
    const history = useHistory() 
    const dispatch = useDispatch()
    const userCredentials = useAuthedUserCredentials()

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
                    <span className='profile-meta-text'>
                        <FaUsers className='profile-icon' size={22}/>Following {user.followingsCount}
                    </span>
                    <span className='profile-meta-text'>
                        <FaUsers className='profile-icon' size={22}/>Followers {user.followersCount}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProfileDataSmall

