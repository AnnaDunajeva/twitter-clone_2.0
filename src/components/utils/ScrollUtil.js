
import React, {useEffect, useState, useRef, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    LOADED, 
    LOADING, 
    ERROR} from '../../redux-store-2.0/constants'
import {
    getCompositeDataFetchStatus, 
    getCompositeDataLastFetchTime, 
    getCompositeDataDoneStatus, 
    getCompositeDataError} from '../../redux-store-2.0/composite-data/selectors'
import {compositeDataSetDone, compositeDataClear} from '../../redux-store-2.0/composite-data/actions'
import Loading from './Loading.js'

const ScrollUtil = ({
    getDataFetch, 
    dispatchData, 
    stateSelector, 
    take, 
    headerText, 
    noDataText, 
    noDataHeader,
    stateKey, 
    scrollableTarget, 
    reset,
    children
}) => {
    const dispatch = useDispatch()
    const ids = useSelector(stateSelector)
    const fetchStatus = useSelector(getCompositeDataFetchStatus(stateKey))
    const error = useSelector(getCompositeDataError(stateKey))
    const lastFetchTime = useSelector(getCompositeDataLastFetchTime(stateKey))
    const done = useSelector(getCompositeDataDoneStatus(stateKey))
    
    //savedIdsLength is lenght of ids before last fetch
    const [savedIdsLength, setSavedIdsLength] = useState( 
        done 
            ? ids.length
            : ids.length >= take
                ? ids.length - take 
                : 0
    )
    
    const initialFetchTime = useRef(lastFetchTime || Date.now())
    const skip = useRef(ids.length)

    const memorizedFetch = useCallback(async(from)=> { 
        // console.log('memorized fetch fetching ', from)
        await dispatch(getDataFetch({
            ...dispatchData,
            take,
            skip: skip.current,
            time: initialFetchTime.current
        }))
        skip.current = skip.current + take
    }, [dispatch, dispatchData, getDataFetch, take])

    useEffect(() => {
        // console.log('initiating scroll inside effect')
        const asyncDispatch = async () => {
            skip.current = ids.length 
            await memorizedFetch('from initial mount')
            setSavedIdsLength(ids.length) //inside function ids isnt updated yet (despite state being updated)
        }

        if (!done && ids.length < 13 && fetchStatus !== LOADING && fetchStatus !== LOADED && !error) { 
        //when tweet deleted from client, fetchstatus set to pending update so that we will automatically make fetch if there is
        //to few tweets to be able to make scroll
        //ids.length < take is needed to make initial fetch again after delete - this way we fetch if there is too few tweets to make scroll
            // console.log('making initial fetch for scroll')
            asyncDispatch();
        }
    }, [dispatch, memorizedFetch, ids.length, take, done, fetchStatus, error]) 
    

    useEffect(() => {
        // console.log('is there more data to fetch? ', !(fetchStatus === LOADED && ids.length - savedIdsLength < take))

        if (!done && fetchStatus === LOADED && ids.length - savedIdsLength < take) {
            dispatch(compositeDataSetDone(stateKey, true))
        }
    }, [fetchStatus, ids, savedIdsLength, take, done, stateKey, dispatch])


    useEffect(()=>{
        //if reset true, then set all to null
        return ()=> {
            if (reset) {
                // console.log('scrollUtil: about to cleat all data cause reset is true')
                dispatch(compositeDataClear(stateKey))
            }
        }
    }, [reset, dispatch, stateKey])

    const fetchScroll = async () => {
        await memorizedFetch('from scroll fetch')
        setSavedIdsLength(ids.length) //inside this function ids isnt updated yet (despite state being updated)
        // console.log('savedIdsLength ', ids.length)
    }

    return (
        <React.Fragment>
            {/* {console.log('error!!!!!!!!!!!!!!!!!!!!!: ', error)} */}
            {/* {console.log('rendering scroll', 'hasmore ', !done, savedIdsLength, 'skip ', skip, 'fetchStatus ', fetchStatus)} */}
            {/* {console.log('ids ', ids)} */}
            {headerText && ids.length !== 0 &&
                <h3>{headerText}</h3>} 
            {ids.length === 0 && fetchStatus === LOADED &&
                <h3>{noDataHeader ? noDataHeader : headerText} </h3>}
            {ids.length !== 0 &&
                <InfiniteScroll
                    dataLength={ids.length}
                    next={fetchScroll}
                    hasMore={!done && !error}
                    scrollableTarget={scrollableTarget}
                    scrollThreshold={0.85}
                    loader={<Loading text='Fetching' speed={200}/>}
                    endMessage={
                        <p style={{margin: '20px', textAlign: 'center'}}>
                            {error
                                ?<b>{`Oops, something went wrong. ${error}. Try refreshing page.`}</b>
                                :ids.length > 5
                                    ?<b>Yay! You have seen it all</b>
                                    :null
                            }
                        </p>}
                    >
                    {children(ids)} 
                </InfiniteScroll>
            }
            {ids.length === 0 && (fetchStatus === LOADED || fetchStatus === ERROR )&& 
                <p style={{marginBottom: '20px', textAlign: 'center'}}>
                    {error
                        ?<b>Oops, something went wrong, try refreshing page.</b>
                        :<b>{noDataText}</b>}
                </p>}
        </React.Fragment>
    )
}
ScrollUtil.propTypes = {
    getDataFetch: PropTypes.func.isRequired, 
    stateSelector: PropTypes.func.isRequired, 
    take: PropTypes.number.isRequired, 
    dispatchData: PropTypes.object, 
    headerText: PropTypes.string, 
    noDataText: PropTypes.string, 
    noDataHeader: PropTypes.string,
    stateKey: PropTypes.string.isRequired, 
    scrollableTarget: PropTypes.string, 
    reset: PropTypes.bool,
}
ScrollUtil.defaultProps = {
    dispatchData: {},
    noDataText: 'nothing to show yet',
}

export default ScrollUtil








