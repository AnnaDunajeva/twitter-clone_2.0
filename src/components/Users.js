import React from 'react'
import {useSelector} from 'react-redux'
import UserCard from './UserCard'
import ScrollUtil from './ScrollUtil'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import {getDiscoverUsersIds} from '../redux-store-2.0/composite-data/selectors'
import {getAllUsersPaginated} from '../redux-store-2.0/api/users'
import {discoverUsersKey} from '../redux-store-2.0/utils/compositeDataStateKeys'

const Users = () => {
    const authedUser = useSelector(getAuthedUserId())
    const take = 7

    const dispatchData = {user: {
        userId: authedUser,
        token: localStorage.getItem('token')
    }}
    
    const usersSelector = useSelector(getDiscoverUsersIds())

    return (
        <ScrollUtil 
            getDataFetch={getAllUsersPaginated} 
            dispatchData={dispatchData} 
            stateSelector={usersSelector} 
            take={take} 
            headerText={'Find interesting people to follow!'} 
            noDataText={'No users joind yet!'}
            stateKey={discoverUsersKey()}
            >
            {(ids)=>(
                <ul>
                    {ids.map((userId) => (
                        <li key={userId}>
                            <UserCard userId={userId}/>
                        </li>
                    ))}
                </ul>
            )}
        </ScrollUtil>
    )
}

export default Users


// import React, {useEffect, useState, useRef, useCallback} from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import {handleAllUsers, handleGetAllUsersPaginated, deleteAllUsers} from '../redux-store/actions/users'
// import {handleGetUserProfile} from '../redux-store/actions/profile'
// import UserCard from './UserCard'
// import InfiniteScroll from 'react-infinite-scroll-component';
// import Loading from './Loading.js'

// const selectorFunc = ({users, authedUser}) => {
//     const userIds = Object.keys(users) //.sort((a,b) => users[b].followers.length - users[a].followers.length)
//     return userIds //.filter(id => id !== authedUser) //&& !users[authedUser].followings.includes(id)
// }

// const Users = () => {
//     const dispatch = useDispatch()
//     const userIds = useSelector(selectorFunc)
//     const authedUser = useSelector(state => state.authedUser)
//     const [savedUserIdsLength, setSavedUserIdsLength] = useState(userIds.length)
//     const [fetched, setFetched] = useState(false)
//     const take = 7
//     const skip = useRef(0)
//     const [hasMore, setHasMore] = useState(true)
//     const initialFetchTime = useRef(null)

//     // useEffect(() => {
//     //     //in future needs to be redone using Suspense, which is not implemented in react yet
//     //     let didCancel = false;

//     //     const asyncDispatch = async () => {
//     //         await dispatch(handleAllUsers({
//     //             userId: localStorage.getItem('userId'),
//     //             token: localStorage.getItem('token')
//     //         }))
//     //         if (!didCancel) {
//     //             console.log('setting fetched to true')
//     //             setFetched(true)
//     //           }
//     //     }
//     //     asyncDispatch();
//     //     return () => { didCancel = true; };
//     // }, [dispatch])
//     const memorizedFetchUsers = useCallback(async()=> {
//         await dispatch(handleGetAllUsersPaginated({
//             user: {
//                 userId: authedUser,
//                 token: localStorage.getItem('token')
//             },
//             take,
//             skip: skip.current,
//             time: initialFetchTime.current
//         }))
//         skip.current = skip.current + take
//     }, [dispatch, authedUser])

//     useEffect(() => {
//         //in future needs to be redone using Suspense, which is not implemented in react yet
//         let didCancel = false;
//         initialFetchTime.current = Date.now()

//         const asyncDispatch = async () => {
//             await dispatch(deleteAllUsers()) 
//             setSavedUserIdsLength(0)
//             await dispatch(handleGetUserProfile({ //also appends profile to users
//                 userId: localStorage.getItem('userId'),
//                 token: localStorage.getItem('token')
//             }))
//             await memorizedFetchUsers()
//             if (!didCancel) {
//                 console.log('setting fetched to true')
//                 setFetched(true)
//               }
//         }
//         asyncDispatch();
//         return () => { didCancel = true; };
//     }, [dispatch, memorizedFetchUsers, authedUser])

//     useEffect(() => {
//         console.log('savedUserIdsLength ', savedUserIdsLength, 'userIds.length ', userIds.length)
//         if (fetched) {
//             if(userIds.length - savedUserIdsLength < take) {
//                 setHasMore(false)
//             } else {
//                 setHasMore(true)
//             }
//         }
//     }, [fetched, userIds, savedUserIdsLength])

//     const fetchUsersScroll = async () => {
//         await memorizedFetchUsers()
//         setSavedUserIdsLength(userIds.length)
//         console.log('savedUserIdsLength ', savedUserIdsLength, 'initialFetchTime.current', initialFetchTime.current)
//     }


//     return (
//         <div>
//             {console.log('rendering users', 'hasmore ', hasMore, savedUserIdsLength)}
//             <h1 className='header'>Find interesting people to follow!</h1>
//             {fetched 
//                 ? <React.Fragment>
//                     <ul>
//                     <InfiniteScroll
//                         dataLength={userIds.length}
//                         next={fetchUsersScroll}
//                         hasMore={hasMore}
//                         scrollThreshold={0.85}
//                         loader={<Loading text='Fetching more' speed={200}/>}
//                         endMessage={
//                             <p className='header-small'>
//                                 <b>Yay! You have seen it all</b>
//                             </p>}
//                     >
//                     {userIds.map((userId) => (
//                         userId !== authedUser
//                         ?<li key={userId}>
//                             <UserCard userId={userId}/>
//                         </li>
//                         :null
//                     ))}
//                     </InfiniteScroll>
//                     </ul>
//                 </React.Fragment>
//                 : null
//             }
//         </div>
//         // <div>
//         //     {console.log('rendering users', userIds)}
//         //     <h1 className='header'>Find interesting people to follow!</h1>
//         //     {fetched 
//         //         ? <React.Fragment>
//         //             <ul>
//         //             {userIds.map((userId) => (
//         //                 <li key={userId}>
//         //                     <UserCard userId={userId}/>
//         //                 </li>
//         //             ))}
//         //             </ul>
//         //         </React.Fragment>
//         //         : null
//         //     }
//         // </div>
//     )
// }

// export default Users
