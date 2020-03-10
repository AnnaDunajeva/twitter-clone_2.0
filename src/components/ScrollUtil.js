// import React, {useEffect, useState, useRef, useCallback} from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import InfiniteScroll from 'react-infinite-scroll-component';
// import Loading from './Loading.js'
// import {LOADED, LOADING} from '../redux-store-2.0/constants'
// import {getCompositeDataFetchStatus, getCompositeDataLastFetchTime} from '../redux-store-2.0/composite-data/selectors'

// const ScrollUtil = ({getDataFetch, dispatchData, stateSelector, take, headerText, noDataText, stateKey, children}) => {
//     const dispatch = useDispatch()
//     const ids = useSelector(stateSelector)
//     const fetchStatus = useSelector(getCompositeDataFetchStatus(stateKey))
//     const lastFetchTime = useSelector(getCompositeDataLastFetchTime(stateKey))

//     const [initialDataFetched, setInitialDataFetched] = useState(ids.length === 0 ? false : true)
    
//     const [savedIdsLength, setSavedIdsLength] = useState(ids.length > 0 && ids.length%take === 0 ? ids.length - take : ids.length)
//     const [hasMore, setHasMore] = useState(true)
    
//     const initialFetchTime = useRef(lastFetchTime || null)
//     const skip = useRef(ids.length)

//     const memorizedFetch = useCallback(async()=> { //rerenders because depends on tweetId
//         console.log('memorized fetch fetching')
//         await dispatch(getDataFetch({
//             ...dispatchData,
//             take,
//             skip: skip.current,
//             time: initialFetchTime.current
//         }))
//         skip.current = skip.current + take
//     }, [dispatch, dispatchData, getDataFetch, take])

//     useEffect(() => {
//         console.log('initiating scroll inside effect')
//         //in future needs to be redone using Suspense, which is not implemented in react yet
//         let didCancel = false;

//         const asyncDispatch = async () => {
//             setSavedIdsLength(0) 
//             skip.current = 0 //setting all this stuff to 0 is kinda pointless
//             initialFetchTime.current = Date.now()
//             setInitialDataFetched(true)
//             await memorizedFetch()
//             // setInitialDataFetched(true)
//             // if (!didCancel) {
//             //     console.log('setting fetched to true')
//             //     setInitialDataFetched(true)
//             //   }
//         }

//         if (!initialDataFetched && fetchStatus !== LOADING) {
//             console.log('making initial fetch for scroll')
//             asyncDispatch();
//         }
//         return () => { didCancel = true; };
//     }, [dispatch, memorizedFetch, initialDataFetched])

//     useEffect(() => {
//         console.log('savedIdsLength ', savedIdsLength, 'ids.length ', ids.length)
//         // console.log('initialDataFetched ', initialDataFetched, 'fetchStatus ', fetchStatus)
//         if (initialDataFetched && fetchStatus === LOADED) {
//             if(ids.length - savedIdsLength < take) {
//                 console.log('setting hasmore to false')
//                 setHasMore(false)
//             } else {
//                 setHasMore(true)
//             }
//         }
//     }, [fetchStatus, initialDataFetched, ids, savedIdsLength, take])

//     const fetchScroll = async () => {
//         await memorizedFetch()
//         setSavedIdsLength(ids.length) //inside function ids isnt updated yet (despite state being updated)
//         // skip.current = skip.current + take
//         console.log('savedIdsLength ', ids.length)
//     }

//     return (
//         <React.Fragment>
//             {console.log('rendering scroll', 'hasmore ', hasMore, savedIdsLength, 'skip ', skip, 'initialDataFetched ', initialDataFetched)}
//             {console.log('ids ', ids)}
//             <h1 className='header'>{headerText}</h1> 
//             {initialDataFetched 
//                 ?ids.length === 0
//                     ?<div className='header-small'>{noDataText}</div> 
//                     :<InfiniteScroll
//                         dataLength={ids.length}
//                         next={fetchScroll}
//                         hasMore={hasMore}
//                         scrollThreshold={0.85}
//                         loader={<Loading text='Fetching more' speed={200}/>}
//                         endMessage={
//                             <p className='header-small'>
//                                 <b>Yay! You have seen it all</b>
//                             </p>}
//                         >
//                     {children(ids)}
//                 </InfiniteScroll>
//                 :null
//             }
//         </React.Fragment>
//     )
// }

// export default ScrollUtil

import React, {useEffect, useState, useRef, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading.js'
import {LOADED, LOADING} from '../redux-store-2.0/constants'
import {getCompositeDataFetchStatus, getCompositeDataLastFetchTime} from '../redux-store-2.0/composite-data/selectors'

const ScrollUtil = ({getDataFetch, dispatchData, stateSelector, take, headerText, noDataText, stateKey, children}) => {
    const dispatch = useDispatch()
    const ids = useSelector(stateSelector)
    const fetchStatus = useSelector(getCompositeDataFetchStatus(stateKey))
    const lastFetchTime = useSelector(getCompositeDataLastFetchTime(stateKey))
    
    //const [savedIdsLength, setSavedIdsLength] = useState(ids.length > 0 && ids.length % take === 0 ? ids.length - take : 0)
    const [savedIdsLength, setSavedIdsLength] = useState(
        ids.length >= take
        ? ids.length - take 
        : 0
    )

    const [hasMore, setHasMore] = useState(true)
    
    const initialFetchTime = useRef(lastFetchTime || null)
    const skip = useRef(ids.length)

    const memorizedFetch = useCallback(async()=> { 
        console.log('memorized fetch fetching')
        await dispatch(getDataFetch({
            ...dispatchData,
            take,
            skip: skip.current,
            time: initialFetchTime.current
        }))
        skip.current = skip.current + take
    }, [dispatch, dispatchData, getDataFetch, take])

    useEffect(() => {
        console.log('initiating scroll inside effect')
        //in future needs to be redone using Suspense, which is not implemented in react yet
        const asyncDispatch = async () => {
            setSavedIdsLength(0) 
            skip.current = 0 //setting all this stuff to 0 is kinda pointless
            initialFetchTime.current = Date.now()
            await memorizedFetch()
        }

        if (ids.length === 0 && fetchStatus !== LOADING && fetchStatus !== LOADED) {
            console.log('making initial fetch for scroll')
            asyncDispatch();
        }
    }, [dispatch, memorizedFetch, ids.length, fetchStatus])

    useEffect(() => {
        console.log('savedIdsLength ', savedIdsLength, 'ids.length ', ids.length)
        // console.log('initialDataFetched ', initialDataFetched, 'fetchStatus ', fetchStatus)
        if (ids.length !== 0 && fetchStatus === LOADED) {
            if(ids.length - savedIdsLength < take) {
                console.log('setting hasmore to false')
                setHasMore(false)
            } else {
                setHasMore(true)
            }
        }
    }, [fetchStatus, ids, savedIdsLength, take])

    const fetchScroll = async () => {
        await memorizedFetch()
        setSavedIdsLength(ids.length) //inside function ids isnt updated yet (despite state being updated)
        // skip.current = skip.current + take
        console.log('savedIdsLength ', ids.length)
    }

    return (
        <React.Fragment>
            {console.log('rendering scroll', 'hasmore ', hasMore, savedIdsLength, 'skip ', skip, 'fetchStatus ', fetchStatus)}
            {console.log('ids ', ids)}
            {ids.length !== 0 || fetchStatus === LOADED ? <h1 className='header'>{headerText}</h1> : null}
            {ids.length === 0
                ?fetchStatus === LOADED && <div className='header-small'>{noDataText}</div> 
                :<InfiniteScroll
                    dataLength={ids.length}
                    next={fetchScroll}
                    hasMore={hasMore}
                    scrollThreshold={0.85}
                    loader={<Loading text='Fetching more' speed={200}/>}
                    endMessage={
                        <p className='header-small'>
                            <b>Yay! You have seen it all</b>
                        </p>}
                    >
                    {children(ids)}
                </InfiniteScroll>
            }
        </React.Fragment>
    )
}

export default ScrollUtil








