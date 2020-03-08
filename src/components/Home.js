import React from 'react'
import {useSelector} from 'react-redux'
import Tweet from './Tweet'
import {handleFeedPaginated, deleteAllTweets} from '../redux-store/actions/tweets'
import ScrollUtil from './ScrollUtil'

const Home = () => {
    const authedUser = useSelector(state => state.authedUser)

    //NB! getting items from local storage can failt if user privacy settings does not allow to use local storage, needs to be wrapper
    //in try catch
    const dispatchData = {user: {
        userId: authedUser,
        token: localStorage.getItem('token')
    }}
    // const feedSelectorFunction = ({tweets, profile}) => { //should pass to scrollutil instead of dataType to filter out parent tweets (which are needed to display replying to)
    //     const tweetIds = []
    //     for (let tweetId in tweets) {
    //         if (tweets[tweetId].author === authedUser) {
    //             tweetIds.push(tweetId)
    //         } else if (profile[authedUser].followings.includes(tweets[tweetId].author)) {
    //             tweetIds.push(tweetId)
    //         } else if (profile[authedUser].tweets.includes(tweets[tweetId].replyingTo)) {
    //             tweetIds.push(tweetId)
    //         }
    //     }
    //     return tweetIds.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    // }
    const feedSelectorFunction = ({tweets}) => {
        const ids = Object.keys(tweets) //.sort((a,b) => users[b].followers.length - users[a].followers.length)
        return ids.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    }
    
    return (
        <ScrollUtil getDataFetch={handleFeedPaginated} 
                    dispatchData={dispatchData} 
                    stateSelector={feedSelectorFunction}
                    deleteDataDispatch={deleteAllTweets} 
                    take={5} 
                    isGetProfile={true} 
                    headerText={'Your Timeline'} 
                    noDataText={'No tweets to show yet!'}
                    >
            {(ids)=>(
                <ul>
                    {ids.map((id) => (
                        <li key={id}>
                            <Tweet id={id}/>
                        </li>
                    ))}
                </ul>  
            )}
        </ScrollUtil>
    )
}

export default Home

// import React, {useEffect, useState, useRef, useCallback} from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import Tweet from './Tweet'
// import {handleInitialData} from '../redux-store/actions/shared'
// import {handleGetUserProfile} from '../redux-store/actions/profile'
// import {handleFeedPaginated, deleteAllTweets} from '../redux-store/actions/tweets'
// import InfiniteScroll from 'react-infinite-scroll-component';
// import Loading from './Loading.js'

// const tweetIdssSelectorFunc = ({tweets}) => {
//     return Object.keys(tweets).sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
// }

// const Home = () => {
//     const dispatch = useDispatch()
//     const authedUser = useSelector(state => state.authedUser)
//     const tweetsIds = useSelector(tweetIdssSelectorFunc)
//     const [savedTweetsIdsLength, setSavedTweetsIdsLength] = useState(tweetsIds.length)
//     const [initialDataFetched, setInitialDataFetched] = useState(false)
//     const take = 5
//     const skip = useRef(0)
//     const [hasMore, setHasMore] = useState(true)
//     const initialFetchTime = useRef(null)

//     const memorizedFetchTweets = useCallback(async()=> {
//         await dispatch(handleFeedPaginated({
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
//             console.log('using effect', ' initialFetchTime.current', initialFetchTime.current)
//             if (authedUser) {
//                 await dispatch(deleteAllTweets())

//                 setSavedTweetsIdsLength(0)

//                 await dispatch(handleGetUserProfile({
//                     userId: authedUser,
//                     token: localStorage.getItem('token')
//                 }))

//                 await memorizedFetchTweets()

//                 skip.current = skip.current + take

//                 if(!didCancel) {
//                     setInitialDataFetched(true)
//                 }
//             } 
//         }
//         asyncDispatch();
//         return () => { didCancel = true; };
//     }, [dispatch, authedUser, memorizedFetchTweets])

//     useEffect(() => {
//         console.log('savedTweetsIdsLength ', savedTweetsIdsLength, 'tweetsIds.length ', tweetsIds.length)
//         if (initialDataFetched) {
//             if(tweetsIds.length - savedTweetsIdsLength < take) {
//                 setHasMore(false)
//             } else {
//                 setHasMore(true)
//             }
//         }
//     }, [initialDataFetched, tweetsIds, savedTweetsIdsLength])

//     const fetchTweetsScroll = async () => {
//         await memorizedFetchTweets()
//         setSavedTweetsIdsLength(tweetsIds.length)
//         console.log('savedTweetsIdsLength ', savedTweetsIdsLength, 'initialFetchTime.current', initialFetchTime.current)
//     }

//     return (
//         <div>
//             {initialDataFetched
//                 ?<React.Fragment>
//                     {console.log('rendering home ', 'hasmore ', hasMore, savedTweetsIdsLength)}
//                     <h1 className='header'>Your Timeline</h1>
//                     {tweetsIds.length === 0 && <div className='header-small'>No tweets to show yet!</div>}                 
//                     <InfiniteScroll
//                             dataLength={tweetsIds.length}
//                             next={fetchTweetsScroll}
//                             hasMore={hasMore}
//                             scrollThreshold={0.85}
//                             loader={<Loading text='Fetching more' speed={200}/>}
//                             endMessage={
//                                 <p className='header-small'>
//                                     <b>Yay! You have seen it all</b>
//                                 </p>}
//                     >
//                         <ul>
//                             {tweetsIds.map((id) => (
//                                 <li key={id}>
//                                     <Tweet id={id}/>
//                                 </li>
//                             ))}
//                         </ul>      
//                     </InfiniteScroll>
//                 </React.Fragment>
//                 :null
//             }
//         </div>
//     )
// }

// export default Home
