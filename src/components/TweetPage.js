import React, { useEffect, useState } from 'react'
import NewTweet from './NewTweet'
import Tweet from './Tweet'
import {useSelector, useDispatch} from 'react-redux'
import { handleGetTweetById, filterTweets, handleRepliesPaginated } from '../redux-store/actions/tweets'
import NotFound from './NotFound'
import ScrollUtil from './ScrollUtil'
import Loading from './Loading.js'

const TweetPage = (props) => {
    const tweetId = props.match.params.id
    const mainTweet = useSelector(({tweets}) => tweets[tweetId])
    // const parent = useSelector(({tweets}) => tweets[mainTweet.replyingTo])
    // const parentTweetMemorized = useRef(null) //because ScrollUtil deletes all tweets before fetching, so if i fetcch parent tweet here it will bw deleted later by scrollutil
    const dispatch = useDispatch()
    const take = 2
    const [mainTweetFetched, setMainTweetFetched] = useState(false)

    const dispatchData = {
        user: {
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('token')
        },
        tweetId
    }
    const repliesSelector = ({tweets}) => {
        const tweetIds = Object.keys(tweets)
        return tweetIds.filter((id) => id !== tweetId && id !== mainTweet.replyingTo)
    }

    // useEffect(() => {
    //     setMainTweetFetched(false)
    //     const asyncDispatch = async () => {
    //         await dispatch(filterTweets([tweetId]))
    //         setDeleted(true)
    //     }
    //     asyncDispatch()
    // }, [dispatch, tweetId])

    useEffect(() => {
        //in future needs to be redone using Suspense, which is not implemented in react yet
        let didCancel = false;
        // console.log('desiding weather to fetch main tweet', mainTweetFetched, mainTweet)
        console.log('about to fetch tweet')
        const asyncDispatch = async () => {
            await dispatch(handleGetTweetById({
                tweetId,
                user: {
                    userId: localStorage.getItem('userId'),
                    token: localStorage.getItem('token')
                }
            }))
            console.log('parent tweet fetched')
            setMainTweetFetched(true)
            if (!didCancel) {
                console.log('not cancelled') //for some reason cancelled is true here
                }
        }
        asyncDispatch();
        return () => { didCancel = true; };
    }, [dispatch, tweetId])
    
    if (mainTweet === 'not found') {
        return (
            // <div className='header'>404. Could not find page requested.</div>
            <NotFound />
        )
    } 

    return (
        <React.Fragment>
            {console.log('rendering tweet page', 'fetched', !!mainTweet && mainTweetFetched)}
            {mainTweet && mainTweetFetched //there are situations where state saved that parent tweet was fetched already but parent tweet is undefined cause it was deleted from store
                ? <React.Fragment>
                    {console.log('parent tweet', mainTweet)}
                    <Tweet id={tweetId}/>
                    <NewTweet replyingTo={tweetId}/>
                    <ScrollUtil getDataFetch={handleRepliesPaginated} 
                                dispatchData={dispatchData} 
                                deleteDataDispatch={()=>filterTweets([tweetId])} 
                                stateSelector={repliesSelector}
                                take={take} 
                                isGetProfile={false} 
                                headerText={'Replies'} 
                                noDataText={'No replies yet!'}  
                                >
                                {(ids) => ids.map((id) => <Tweet id={id} key={id}/>)}
                    </ScrollUtil>
                </React.Fragment>
                : <Loading text='Fetching' speed={200}/>
            }
        </React.Fragment>
    )
}

export default TweetPage

// import React, { useEffect, useState, useRef, useCallback } from 'react'
// import NewTweet from './NewTweet'
// import Tweet from './Tweet'
// import {useSelector, useDispatch} from 'react-redux'
// import { handleTweetPage, handleGetTweetById, handleGetUserTweets, handleGetTweetsByIds, deleteAllTweets, handleRepliesPaginated } from '../redux-store/actions/tweets'
// import NotFound from './NotFound'
// import InfiniteScroll from 'react-infinite-scroll-component';
// import ScrollUtil from './ScrollUtil'
// import Loading from './Loading.js'

// const TweetPage = (props) => {
//     const tweetId = props.match.params.id
//     const parentTweet = useSelector(({tweets}) => tweets[tweetId])
//     const dispatch = useDispatch()
//     const take = 2
//     const start = useRef(0)
//     const [hasMore, setHasMore] = useState(true)

//     const [parentTweetFetched, setParentTweetFetched] = useState(false)
//     const [initialRepliesFetched, setInitialRepliesFetched] = useState(false)
//     const [fetchedIds, setFetchedIds] = useState([])
//     // const fetchedIdsSorted = useSelector(({tweets}) => {
//     //     if (fetchedIds.length === 0) {
//     //         return []
//     //     } else {
//     //         const fetchedTweets = fetchedIds.map(id => tweets[id])
//     //         console.log(fetchedTweets)
//     //         return fetchedTweets.sort((a,b) => b.timestamp - a.timestamp).map(tweet => tweet.id)
//     //     }
//     // })

//     // useEffect(() => {
//     //     //in future needs to be redone using Suspense, which is not implemented in react yet
//     //     let didCancel = false;

//     //     const asyncDispatch = async () => {
//     //         await dispatch(handleTweetPage({
//     //             parentTweetId: tweetId,
//     //             user: {
//     //                 userId: localStorage.getItem('userId'),
//     //                 token: localStorage.getItem('token')
//     //             }
//     //         }))
//     //         if (!didCancel) {
//     //             console.log('setting fetched to true')
//     //             setFetched(true)
//     //           }
//     //     }
//     //     asyncDispatch();
//     //     return () => { didCancel = true; };
//     // }, [dispatch, tweetId])

//     const memorizedFetch = useCallback(async () => {
//         console.log('parentTweet.replies.slice(start.current, start.current + take) ', parentTweet.replies.slice(start.current, start.current + take))
//         const idsToFetch = parentTweet.replies.slice(start.current, start.current + take)
//         await dispatch(handleGetTweetsByIds({
//             tweetIds: idsToFetch,
//             user: {
//                 userId: localStorage.getItem('userId'),
//                 token: localStorage.getItem('token')
//             }
//         }))
//         start.current = start.current + take
//         console.log('start.current ', start.current)
//         setFetchedIds(state => [...state, ...idsToFetch])
//         if(start.current >= parentTweet.replies.length) {
//             setHasMore(false)
//         }
//     }, [dispatch, parentTweet])

//     useEffect(() => {
//         //in future needs to be redone using Suspense, which is not implemented in react yet
//         let didCancel = false;

//         const asyncDispatch = async () => {
//             await dispatch(deleteAllTweets())
//             start.current= 0
//             await dispatch(handleGetTweetById({
//                 tweetId,
//                 user: {
//                     userId: localStorage.getItem('userId'),
//                     token: localStorage.getItem('token')
//                 }
//             }))
//             if (!didCancel) {
//                 console.log('setting fetched to true')
//                 console.log(parentTweet)
//                 setParentTweetFetched(true)
//               }
//         }
//         asyncDispatch();
//         return () => { didCancel = true; };
//     }, [dispatch, tweetId])

//     useEffect(() => {
//         console.log('problematic effect')
//         if(parentTweetFetched && !initialRepliesFetched) {
//             console.log('problematic effect', parentTweet, initialRepliesFetched)
//             const asyncFetch = async () => {
//                 await memorizedFetch()
//                 setInitialRepliesFetched(true)
//             }
//             asyncFetch()
//         }
//     }, [parentTweetFetched, initialRepliesFetched, parentTweet, memorizedFetch])

//     const fetchReplies = async () => {
//         await dispatch(handleGetTweetsByIds({
//             tweetIds: parentTweet.replies.slice(start.current, start.current + take),
//             user: {
//                 userId: localStorage.getItem('userId'),
//                 token: localStorage.getItem('token')
//             }
//         }))
//         start.current = start.current + take
//         if(start.current >= parentTweet.replies.length) {
//             setHasMore(false)
//         }
//     }
    
//     if (parentTweet === 'not found') {
//         return (
//             // <div className='header'>404. Could not find page requested.</div>
//             <NotFound />
//         )
//     } 

//     return (
//         <React.Fragment>
//             {console.log('rendering tweet page', 'fetched', parentTweetFetched)}
//             {parentTweetFetched 
//                 ? <React.Fragment>
//                     {console.log('parent tweet', parentTweet)}
//                     {console.log('initialRepliesFetched', initialRepliesFetched)}
//                     <Tweet id={tweetId}/>
//                     <NewTweet replyingTo={tweetId}/>
//                     {initialRepliesFetched
//                         ?parentTweet.replies.length === 0
//                             ?<div className='header-small'>No replies yet!</div>
//                             :<InfiniteScroll
//                                 dataLength={fetchedIds.length}
//                                 next={memorizedFetch}
//                                 hasMore={hasMore}
//                                 scrollThreshold={0.85}
//                                 loader={<Loading text='Fetching more' speed={200}/>}
//                                 endMessage={
//                                     <p className='header-small'>
//                                         <b>Yay! You have seen it all</b>
//                                     </p>}
//                             >
//                                 {fetchedIds.map((id) => <Tweet id={id} key={id}/>)}
//                             </InfiniteScroll>
//                         :<Loading text='Fetching' speed={200}/>
//                     }
//                 </React.Fragment>
//                 : null
//             }
//         </React.Fragment>
//     )
// }

// export default TweetPage