
import React, {useEffect, useState, useRef, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading.js'
import {LOADED, LOADING, PENDING_UPDATE} from '../redux-store-2.0/constants'
import {getCompositeDataFetchStatus, getCompositeDataLastFetchTime, getCompositeDataDoneStatus} from '../redux-store-2.0/composite-data/selectors'
import {compositeDataSetFetchStatus, compositeDataSetDone} from '../redux-store-2.0/composite-data/actions'

const ScrollUtil = ({getDataFetch, dispatchData, stateSelector, take, headerText, noDataText, stateKey, children}) => {
    const dispatch = useDispatch()
    const ids = useSelector(stateSelector)
    const fetchStatus = useSelector(getCompositeDataFetchStatus(stateKey))
    const lastFetchTime = useSelector(getCompositeDataLastFetchTime(stateKey))
    const done = useSelector(getCompositeDataDoneStatus(stateKey))
    
    // const [hasMore, setHasMore] = useState(true)
    const [savedIdsLength, setSavedIdsLength] = useState( //we want to make at least one fetch each time compopnent mounts
        done 
            ? ids.length
            : ids.length >= take
                ? ids.length - take 
                : 0
    )
    
    const initialFetchTime = useRef(lastFetchTime || Date.now())
    const skip = useRef(ids.length)

    const memorizedFetch = useCallback(async(from)=> { 
        console.log('memorized fetch fetching ', from)
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
            skip.current = ids.length 
            // initialFetchTime.current = Date.now()
            await memorizedFetch('from initial mount')
            setSavedIdsLength(ids.length) //inside function ids isnt updated yet (despite state being updated)
        }

        if (!done && ids.length < take && fetchStatus !== LOADING && fetchStatus !== LOADED) { //fetchStatus !== LOADING && fetchStatus !== LOADED
        //when tweet deleted from client, fetchstatus set to pending update so that we will automatically make fetch if there is
        //to few tweets to be able to make scroll
            console.log('making initial fetch for scroll')
            asyncDispatch();
        }
    }, [dispatch, memorizedFetch, ids.length, take, done, fetchStatus]) //fetchStatus
    

    useEffect(() => {
        console.log('is there more data to fetch? ', !(fetchStatus === LOADED && ids.length - savedIdsLength < take))
        console.log('savedIdsLength ', savedIdsLength, 'ids.length ', ids.length)

        if (!done && fetchStatus === LOADED && ids.length - savedIdsLength < take) {
            // setHasMore(false)
            dispatch(compositeDataSetDone(stateKey, true))
        }
    }, [fetchStatus, ids, savedIdsLength, take, done, stateKey, dispatch])


    // useEffect(()=>{
    //     return ()=>dispatch(compositeDataSetFetchStatus(stateKey, PENDING_UPDATE)) //dont need it for now really
    // }, [dispatch, stateKey])


    const fetchScroll = async () => {
        await memorizedFetch('from scroll fetch')
        setSavedIdsLength(ids.length) //inside function ids isnt updated yet (despite state being updated)
        console.log('savedIdsLength ', ids.length)
    }

    return (
        <React.Fragment>
            {console.log('rendering scroll', 'hasmore ', !done, savedIdsLength, 'skip ', skip, 'fetchStatus ', fetchStatus)}
            {console.log('ids ', ids)}
            {headerText && (ids.length !== 0 || fetchStatus === LOADED) ? <h1 className='header'>{headerText}</h1> : null}
            {ids.length !== 0 &&
                <InfiniteScroll
                    dataLength={ids.length}
                    next={fetchScroll}
                    hasMore={!done}
                    scrollThreshold={0.85}
                    loader={<Loading text='Fetching' speed={200}/>}
                    endMessage={
                        <p className='header-small' style={{marginBottom: '20px'}}>
                            <b>Yay! You have seen it all</b> 
                        </p>}
                    >
                    {children(ids)}
                </InfiniteScroll>
            }
            {ids.length === 0 && fetchStatus === LOADED && <p className='header-small' style={{marginBottom: '20px'}}>{noDataText}</p>}
        </React.Fragment>
    )
}

export default ScrollUtil








