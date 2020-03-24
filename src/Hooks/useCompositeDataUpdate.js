import { useEffect, useState, useCallback, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCompositeDataFirstEntityCreatedAt} from '../redux-store-2.0/composite-data/selectors'

const useCompositeDataUpdate = ({take, dispatchData, getUpdateFunc, stateKey}) => {
    const initialFetchTime = useSelector(getCompositeDataFirstEntityCreatedAt(stateKey))
    const [scrollY, setScrollY] = useState(window.scrollY);
    const dispatch = useDispatch()

    const listener = e => {
        setScrollY(window.scrollY);
    };
    
    useEffect(() => {
        window.addEventListener("scroll", listener);
        return () => {
            console.log('removing scroll listener')
            window.removeEventListener("scroll", listener);
        };
    }, []);

    useEffect(()=>{
        let updateInterval = null
        if (initialFetchTime && scrollY < 300) {
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
    }, [scrollY, initialFetchTime])
}

export default useCompositeDataUpdate
