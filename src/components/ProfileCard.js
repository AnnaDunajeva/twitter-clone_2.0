import React from 'react'
import {useSelector} from 'react-redux'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import ProfileBackgroundWithAvatar from './ProfileBackgroundWithAvatar'
import ProfileDataSmall from './ProfileDataSmall'

const ProfileCard = ({user, setToUpdate}) => {
    const authedUser = useSelector(getAuthedUserId())
    const isAuthedUser = user.userId === authedUser ? true : false
    
    return (
        <React.Fragment>
            <ProfileBackgroundWithAvatar user={user} />
            <ProfileDataSmall user={user} isAuthedUser={isAuthedUser} setToUpdate={setToUpdate}/>
        </React.Fragment>
    )
}

export default ProfileCard

// import React, {useCallback} from 'react'
// import {useSelector} from 'react-redux'
// import {withRouter} from 'react-router-dom'
// import Tweet from './Tweet'
// import ScrollUtil from './ScrollUtil'
// import {getUserTweetsPaginated} from '../redux-store-2.0/api/tweets'
// import {getUserTweetIds} from '../redux-store-2.0/composite-data/selectors'
// import {userTweetsKey} from '../redux-store-2.0/utils/compositeDataStateKeys'
// import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
// import ProfileBackgroundWithAvatar from './ProfileBackgroundWithAvatar'
// import ProfileDataSmall from './ProfileDataSmall'

// const ProfileCard = ({user, history}) => {
//     const authedUser = useSelector(getAuthedUserId())
//     const isAuthedUser = user.userId === authedUser ? true : false

//     const dispatchData = {
//         user: {
//             userId: authedUser,
//             token: localStorage.getItem('token')
//         },
//         userId: user.userId
//     }
//     const userTweetsSelector = useCallback(getUserTweetIds(user.userId), []) //not sure if I need it
    
//     return (
//         <React.Fragment>
//             <ProfileBackgroundWithAvatar user={user} />
//             {/* className='data-container' */}
//             <div  style={{marginBottom: '10px'}}> 
//                 <ProfileDataSmall user={user} isAuthedUser={isAuthedUser} history={history}/>
//                 <div className='profile-tweets big-container' style={{borderRadius: '2px', margin: '7px auto', alignSelf: 'stretch', width: 'initial'}}>
//                     <ScrollUtil getDataFetch={getUserTweetsPaginated} 
//                                 dispatchData={dispatchData} 
//                                 stateSelector={userTweetsSelector} 
//                                 stateKey={userTweetsKey(user.userId)}
//                                 take={4} 
//                                 headerText={'Tweets'} 
//                                 noDataText={'No tweets to show yet!'}
//                                 >
//                         {(ids)=>(
//                             ids.map((id) => (
//                                     <Tweet id={id}/>
//                             ))
//                         )}
//                     </ScrollUtil>
//                 </div>
//             </div>
//         </React.Fragment>
//     )
// }

// export default withRouter(ProfileCard)

