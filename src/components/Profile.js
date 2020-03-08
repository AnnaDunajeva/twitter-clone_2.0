import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {handleGetUserProfile} from '../redux-store/actions/profile'
import {handleGetUser} from '../redux-store/actions/users'
import ProfileCard from './ProfileCard'
import NotFound from './NotFound'

const Profile = (props) => {
    const userId = props.match.params.userId
    const authedUser = useSelector(state => state.authedUser)
    const isAuthedUser = userId === authedUser ? true : false

    const user = useSelector((state) => {
        if (isAuthedUser) {
            return state.profile[authedUser]
        } else {
            return state.users[userId]
        }
    })

    const dispatch = useDispatch()
    const [fetched, setFetched] = useState(false)

    //needs to be redone to accaunt for searched profiles,not only authed user's
    useEffect(() => {
        //in future needs to be redone using Suspense, which is not implemented in react yet
        let didCancel = false;
        const asyncDispatch = async () => {
            const user = {
                    userId: localStorage.getItem('userId'),
                    token: localStorage.getItem('token')
            }
            if (isAuthedUser) {
                await dispatch(handleGetUserProfile(user))
            } else {
                await dispatch(handleGetUser({userId, user}))
            }
            if (!didCancel) {
                console.log('setting fetched to true')
                setFetched(true)
              }
        }
        asyncDispatch();
        return () => { didCancel = true; };
    }, [dispatch, isAuthedUser, userId])
    
    if (user === 'not found') {
        return (
            <NotFound />
        )
    } 
    return (
        <React.Fragment>
            {console.log('rendering profile page', 'fetched', fetched)}
            {console.log('profile: ', user)}
            {fetched //works because there is no way to go from /user/:userId to another /user/:userId
                ? <React.Fragment>
                    <ProfileCard user={user} isAuthedUser={isAuthedUser}/>
                </React.Fragment>
                : null
            }
        </React.Fragment>
    )
}

export default Profile

// import React, {useEffect, useState} from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import {handleGetUserProfile} from '../redux-store/actions/profile'
// import {handleGetUserTweets} from '../redux-store/actions/tweets'
// import {handleGetUser} from '../redux-store/actions/users'
// import ProfileCard from './ProfileCard'

// const Profile = (props) => {
//     const userId = props.match.params.userId
//     const authedUser = useSelector(state => state.authedUser)
//     const isAuthedUser = userId === authedUser ? true : false

//     const user = useSelector((state) => {
//         if (isAuthedUser) {
//             return state.profile[authedUser]
//         } else {
//             return state.users[userId]
//         }
//     })

//     const dispatch = useDispatch()
//     const [fetched, setFetched] = useState(false)

//     //needs to be redone to accaunt for searched profiles,not only authed user's
//     useEffect(() => {
//         //in future needs to be redone using Suspense, which is not implemented in react yet
//         let didCancel = false;
//         const asyncDispatch = async () => {
//             const user = {
//                     userId: localStorage.getItem('userId'),
//                     token: localStorage.getItem('token')
//             }
//             if (isAuthedUser) {
//                 await dispatch(handleGetUserProfile(user))
//                 await dispatch(handleGetUserTweets({userId, user}))
//             } else {
//                 await dispatch(handleGetUser({userId, user}))
//                 await dispatch(handleGetUserTweets({userId, user}))
//             }
//             if (!didCancel) {
//                 console.log('setting fetched to true')
//                 setFetched(true)
//               }
//         }
//         asyncDispatch();
//         return () => { didCancel = true; };
//     }, [dispatch, isAuthedUser, userId])

//     return (
//         <div>
//             {console.log('rendering profile page', 'fetched', fetched)}
//             {console.log('profile: ', user)}
//             {fetched 
//                 ? <React.Fragment>
//                     <ProfileCard user={user} isAuthedUser={isAuthedUser}/>
//                 </React.Fragment>
//                 : null
//             }
//         </div>
//     )
// }

// export default Profile