import React, {useCallback} from 'react'
import {getFeedPaginated} from '../redux-store-2.0/api/tweets'
import {getFeedIds } from '../redux-store-2.0/composite-data/selectors'
import {homeKey} from '../redux-store-2.0/utils/compositeDataStateKeys'
import NewTweet from './NewTweet'
import TweetsList from './TweetsList'
import useAuthedUserCredentials from '../Hooks/useAuthedUserCredentials'
import {getFeedUpdate} from '../redux-store-2.0/api/tweets'
import useCompositeDataUpdate from '../Hooks/useCompositeDataUpdate'
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCompositeDataFirstEntityCreatedAt} from '../redux-store-2.0/composite-data/selectors'

const Home = () => {
    const feedIds = useCallback(getFeedIds(), [])
    const dispatchData = useAuthedUserCredentials()
    useCompositeDataUpdate({take: 1, dispatchData, getUpdateFunc: getFeedUpdate, stateKey: homeKey()})

    // const initialFetchTime = useSelector(getCompositeDataFirstEntityCreatedAt(homeKey()))
    // const [scrollY, setScrollY] = useState(window.scrollY);
    // const [updateInterval, setUpdateInterval] = useState(null)
    // const dispatch = useDispatch()

    // const listener = e => {
    //     setScrollY(window.scrollY);
    // };
    // const getCompositeDataUpdate = useCallback(async() => {
    //     console.log('about to fetch update for ', homeKey())
    //     await dispatch(getFeedUpdate({
    //         ...dispatchData,
    //         take: 1,
    //         time: initialFetchTime
    //     }))
    // }, [initialFetchTime, dispatchData, dispatch])
    
    // useEffect(() => {
    //     window.addEventListener("scroll", listener);
    //     return () => {
    //         window.removeEventListener("scroll", listener);
    //     };
    // }, []);

    // useEffect(()=>{
    //     console.log('interval: ', updateInterval)
    //     if (initialFetchTime && scrollY === 0 && !updateInterval) {
    //         console.log('about to set interval to fetch update for ', homeKey())
    //         setUpdateInterval(setInterval(getCompositeDataUpdate, 30000))
    //     }
    //     if (scrollY !== 0 && updateInterval) {
    //         console.log('about to cleat interval for fetch update for ', homeKey(), ' because user scrolled')
    //         setUpdateInterval(null)
    //         clearInterval(updateInterval)
    //     }
    //     return () => {
    //         console.log('about to cleat interval for fetch update for ', homeKey(), ' because component unmounted')
    //         clearInterval(updateInterval)
    //     }
    // }, [scrollY, initialFetchTime, updateInterval, getCompositeDataUpdate])

    return (
        <React.Fragment>
            <div className='big-container'>
                <NewTweet showHeader={false}/>
            </div>
            <div className='big-container'>
                <TweetsList 
                    stateSelector={feedIds}
                    take={5} 
                    stateKey={(homeKey())}
                    dispatchData={dispatchData} 
                    getDataFetch={getFeedPaginated} 
                    headerText={'Your Timeline'}
                />
            </div>
        </React.Fragment>
    )
}

export default Home

