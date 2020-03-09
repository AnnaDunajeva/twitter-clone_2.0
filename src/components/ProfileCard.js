import React, {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Tweet from './Tweet'
import {IoIosSettings} from "react-icons/io"
import ScrollUtil from './ScrollUtil'
import {getUserTweetsPaginated} from '../redux-store-2.0/api/tweets'
import {getUserTweetIds} from '../redux-store-2.0/composite-data/selectors'
import {userTweetsKey} from '../redux-store-2.0/utils/compositeDataStateKeys'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import {formatJoinDate} from '../utils/helpers'
import { MdLocationOn } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"
import { FaUser, FaUsers } from 'react-icons/fa'

const ProfileCard = ({user, history}) => {
    const authedUser = useSelector(getAuthedUserId())
    const isAuthedUser = user.userId === authedUser ? true : false

    const dispatchData = {
        user: {
            userId: authedUser,
            token: localStorage.getItem('token')
        },
        userId: user.userId
    }
    const userTweetsSelector = useCallback(getUserTweetIds(user.userId), []) //not sure if I need it
    
    return (
        <React.Fragment>
        <div className='background-container'>
            {console.log('rendering user card')}
            <div className='under-avatar'></div>
            <img src={user.avatarURL} alt={`Avatar for ${user.name}`} className='profile-avatar'/>
            <div className='profile-name'>{user.name}</div>
        </div>
        <div className='data-container'>
            <div className='profile-meta'>
                {isAuthedUser
                    ?
                    <div className=' profile-settings'>
                        <IoIosSettings onClick={()=>history.push(`/user/${user.userId}/update`)} className='clickable hover-blue profile-setting-wheel' size={35} />
                    </div>
                    : null
                }
                <div className='profile-meta-text profile-meta-text-first'>
                    <FaUser className='profile-icon' size={22}/>
                    @{user.userId}
                </div>
                <div className='profile-meta-text'>
                    <IoMdCalendar className='profile-icon' size={22}/>
                    Joined {formatJoinDate(user.createdAt)}
                </div>
                <div className='profile-meta-text'>
                    <MdLocationOn className='profile-icon' size={22}/>
                    {user.location}
                </div>
                <div className='profile-meta-text'>
                    <FaUsers className='profile-icon' size={22}/>
                    Following {user.followingsCount} | Followers {user.followersCount}</div>
            </div>
            <div className='profile-tweets'>
                <ScrollUtil getDataFetch={getUserTweetsPaginated} 
                            dispatchData={dispatchData} 
                            stateSelector={userTweetsSelector} 
                            stateKey={userTweetsKey(user.userId)}
                            take={4} 
                            headerText={'Tweets'} 
                            noDataText={'No tweets to show yet!'}
                            >
                    {(ids)=>(
                        ids.map((id) => <Tweet id={id} key={id}/>)  
                    )}
                </ScrollUtil>
            </div>
        </div>
        </React.Fragment>
    )
}

export default withRouter(ProfileCard)

// import React, {useState, useEffect} from 'react'
// import {useSelector} from 'react-redux'
// import {Link, withRouter} from 'react-router-dom'
// import Tweet from './Tweet'
// import {IoIosSettings} from "react-icons/io"

// const ProfileCard = ({user, history, isAuthedUser}) => {
//     const tweetsIdsSorted = useSelector(({tweets}) => {
//         const userTweets = {}
//         for (let tweet in tweets) {
//             if (tweets[tweet].author === user.userId) {
//                 userTweets[tweet] = tweets[tweet]
//             }
//         }
//         return Object.keys(userTweets).sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
//     })
    
//     return (
//         <React.Fragment>
//         <div className='background-container'>
//             {console.log('rendering user card')}
//             <div className='under-avatar'></div>
//             <img src={user.avatarURL} alt={`Avatar for ${user.name}`} className='profile-avatar'/>
//             <div className='profile-name'>{user.name}</div>
//         </div>
//         <div className='data-container'>
//             <div className='profile-meta'>
//                 {isAuthedUser
//                     ?
//                     <div className=' profile-settings'>
//                         <IoIosSettings onClick={()=>history.push(`/user/${user.userId}/update`)} className='clickable hover-blue profile-setting-wheel' size={35} />
//                     </div>
//                     : null
//                 }
//                 <div className='profile-meta-text profile-meta-text-first'>@{user.userId}</div>
//                 <div className='profile-meta-text'>Joined Some Date</div>
//                 <div className='profile-meta-text'>Location Maybe</div>
//                 <div className='profile-meta-text'>Following {user.followings.length} | Followers {user.followers.length}</div>
//             </div>
//             <div className='profile-tweets'>
//                 <h3 className='header'>Tweets</h3>
//                 {tweetsIdsSorted.map((id) => <Tweet id={id} key={id}/>)}
//                 {tweetsIdsSorted.length === 0 && <div className='header-small'>No tweets posted yet!</div>}
//             </div>
//         </div>
//         </React.Fragment>
//     )
// }

// export default withRouter(ProfileCard)
