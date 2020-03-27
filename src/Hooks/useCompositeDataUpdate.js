import { useEffect, useState, useCallback, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCompositeDataFirstEntityCreatedAt} from '../redux-store-2.0/composite-data/selectors'

const useCompositeDataUpdate = ({take, dispatchData, getUpdateFunc, stateKey}) => {
    const initialFetchTime = useSelector(getCompositeDataFirstEntityCreatedAt(stateKey)) //what if first tweet got deleted...
    const [scrollY, setScrollY] = useState(window.scrollY);
    const dispatch = useDispatch()
    const [initialFetch, setInitialFetch] = useState(false)

    const listener = e => {
        setScrollY(window.scrollY);
    };
    
    useEffect(() => {
        window.addEventListener("scroll", listener);
        return () => {
            // console.log('removing scroll listener')
            window.removeEventListener("scroll", listener);
        };
    }, []);

    useEffect(() => {
        if (initialFetchTime && scrollY === 0 && !initialFetch) {
            console.log('initialFetch is false, initialFetchTime is not null, scroll is at 0, about to fetch for initial data update, then will set interval', )
            setInitialFetch(true)
            dispatch(getUpdateFunc({
                ...dispatchData,
                take,
                time: initialFetchTime
            }))
        }
    }, [dispatchData, dispatch, take, initialFetchTime, getUpdateFunc, initialFetch, scrollY])

    useEffect(() => {
        let updateInterval = null
        if (initialFetchTime && scrollY < 400) {
            console.log('about to set interval to fetch update for ', stateKey)
            
            const getCompositeDataUpdate = () => {
                console.log('about to fetch update for ', stateKey)
                console.log('initialFetchTime ', initialFetchTime)
                
                dispatch(getUpdateFunc({
                    ...dispatchData,
                    take,
                    time: initialFetchTime
                }))
            }
            
            updateInterval = setInterval(getCompositeDataUpdate, 30000)
        }

        return () => {
            console.log('about to clear interval for fetch update for ', stateKey, ' because dependencies updated')
            clearInterval(updateInterval)
        }
    }, [scrollY, initialFetchTime, dispatch, dispatchData, getUpdateFunc, stateKey, take])
}

export default useCompositeDataUpdate