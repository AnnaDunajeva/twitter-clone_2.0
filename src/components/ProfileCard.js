import React, {useCallback} from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Tweet from './Tweet'
import ScrollUtil from './ScrollUtil'
import {getUserTweetsPaginated} from '../redux-store-2.0/api/tweets'
import {getUserTweetIds} from '../redux-store-2.0/composite-data/selectors'
import {userTweetsKey} from '../redux-store-2.0/utils/compositeDataStateKeys'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import ProfileBackgroundWithAvatar from './ProfileBackgroundWithAvatar'
import ProfileDataSmall from './ProfileDataSmall'

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
            <ProfileBackgroundWithAvatar user={user} />
            <div className='data-container' style={{marginBottom: '10px'}}>
                <ProfileDataSmall user={user} isAuthedUser={isAuthedUser} history={history}/>
                <div className='profile-tweets big-container' style={{borderRadius: '2px', margin: '7px 0 0 0', alignSelf: 'stretch'}}>
                    <ScrollUtil getDataFetch={getUserTweetsPaginated} 
                                dispatchData={dispatchData} 
                                stateSelector={userTweetsSelector} 
                                stateKey={userTweetsKey(user.userId)}
                                take={4} 
                                headerText={'Tweets'} 
                                noDataText={'No tweets to show yet!'}
                                >
                        {(ids)=>(
                            ids.map((id) => (
                                    <Tweet id={id}/>
                            ))
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
