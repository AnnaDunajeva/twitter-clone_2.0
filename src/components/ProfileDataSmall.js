import React from 'react'
import {formatJoinDate} from '../utils/helpers'
import { MdLocationOn } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"
import { FaUser, FaUsers } from 'react-icons/fa'
import {IoIosSettings} from "react-icons/io"

const ProfileDataSmall = ({user, isAuthedUser, history}) => {    
    return (
        <div className='profile-meta'>
            {isAuthedUser
                ?<IoIosSettings onClick={()=>history.push(`/user/${user.userId}/update`)} className='clickable hover-blue profile-setting-wheel' size={35} />
                : null
            }
            {user.description && 
                <div className='profile-meta-text' style={{paddingBottom: '10px'}}>
                    {user.description}
                </div>
            }
            <div className='profile-meta-text'>
                <FaUser className='profile-icon' size={22}/>
                @{user.userId}
            </div>
            <div className='profile-meta-text'>
                <IoMdCalendar className='profile-icon' size={22}/>
                Joined {formatJoinDate(user.createdAt)}
            </div>
            {user.location &&
                <div className='profile-meta-text'>
                    <MdLocationOn className='profile-icon' size={22}/>
                    {user.location}
                </div>
            }
            <div className='profile-meta-text'>
                <FaUsers className='profile-icon' size={22}/>
                Following {user.followingsCount} | Followers {user.followersCount}
            </div>
        </div>
    )
}

export default ProfileDataSmall

