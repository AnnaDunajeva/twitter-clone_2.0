import React, {useEffect, useState, useRef, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {handleGetUserProfile} from '../redux-store/actions/profile'
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading.js'

const ScrollUtil = ({getDataFetch, dispatchData, stateSelector, deleteDataDispatch, take, isGetProfile, headerText, noDataText, children}) => {
    const dispatch = useDispatch()
    const ids = useSelector(stateSelector)
    const authedUser = useSelector(state => state.authedUser)
    const [savedIdsLength, setSavedIdsLength] = useState(ids.length)
    const [fetched, setFetched] = useState(false)
    const skip = useRef(0)
    const [hasMore, setHasMore] = useState(true)
    const initialFetchTime = useRef(null)

    const memorizedFetch = useCallback(async()=> { //rerenders because depends on tweetId
        console.log('memorized fetch fetching')
        await dispatch(getDataFetch({
            ...dispatchData,
            take,
            skip: skip.current,
            time: initialFetchTime.current
        }))
        skip.current = skip.current + take
    }, [dispatch, dispatchData, take, getDataFetch])

    useEffect(() => {
        console.log('initiating scroll inside effect')
        //in future needs to be redone using Suspense, which is not implemented in react yet
        let didCancel = false;
        initialFetchTime.current = Date.now()

        const asyncDispatch = async () => {
            if (deleteDataDispatch) {
                await dispatch(deleteDataDispatch()) 
                console.log('dispatch(deleteDataDispatch()) ', ids.length) //ids are not updated while effect runs, needs to be rerun for that
            }
            setSavedIdsLength(0) //maybe i should give initial length to props to solve TweetPage problem (1-2 tweets in store are left, not 0)
            skip.current = 0
            if (isGetProfile) {
                await dispatch(handleGetUserProfile({ //also appends profile to users
                    userId: localStorage.getItem('userId'),
                    token: localStorage.getItem('token')
                }))
            }
            await memorizedFetch()
            if (!didCancel) {
                console.log('setting fetched to true')
                setFetched(true)
              }
        }
        asyncDispatch();
        return () => { didCancel = true; };
    }, [dispatch, memorizedFetch, authedUser, deleteDataDispatch, isGetProfile])

    useEffect(() => {
        console.log('savedIdsLength ', savedIdsLength, 'ids.length ', ids.length)
        if (fetched) {
            if(ids.length - savedIdsLength < take) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }
        }
    }, [fetched, ids, savedIdsLength, take])

    const fetchScroll = async () => {
        await memorizedFetch()
        setSavedIdsLength(ids.length) //inside function ids isnt updated yet (despite state being updated)
        console.log('savedIdsLength ', savedIdsLength, 'initialFetchTime.current', initialFetchTime.current)
    }


    return (
        <React.Fragment>
            {console.log('rendering scroll', 'hasmore ', hasMore, savedIdsLength, 'skip ', skip)}
            {console.log('ids ', ids)}
            <h1 className='header'>{headerText}</h1>
            {fetched 
                ? ids.length === 0
                    ? <div className='header-small'>{noDataText}</div>                 
                    : <InfiniteScroll
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
                : null
            }
        </React.Fragment>
    )
}

export default ScrollUtil
