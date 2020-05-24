import { useEffect, useState, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCompositeDataFirstEntityCreatedAt} from '../redux-store-2.0/composite-data/selectors'
import usePageVisibility from './usePageVisibility'
import PropTypes from 'prop-types'

const useCompositeDataUpdate = ({
    take, 
    dispatchData, 
    getUpdateFunc, 
    stateKey, 
    interval
}) => {
    const initialFetchTime = useSelector(getCompositeDataFirstEntityCreatedAt(stateKey)) 
    const [scrollY, setScrollY] = useState(window.scrollY);
    const dispatch = useDispatch()
    const [initialFetch, setInitialFetch] = useState(false)
    const isPageVisible = usePageVisibility()
    const updateInterval = useRef(null)

    const listener = e => {
        setScrollY(window.scrollY);
    };

    const getCompositeDataUpdate = () => {
        // console.log('about to fetch update for ', stateKey)
        // console.log('initialFetchTime ', initialFetchTime)
        
        dispatch(getUpdateFunc({
            ...dispatchData,
            take: 3,
            skip: 0,
            time: initialFetchTime
        }))
    }
    
    useEffect(() => {
        window.addEventListener("scroll", listener);
        return () => {
            window.removeEventListener("scroll", listener);
        };
    }, []);

    //make one fetch on mount
    useEffect(() => {
        if (initialFetchTime && scrollY === 0 && !initialFetch) {
            // console.log('initialFetch is false, initialFetchTime is not null, scroll is at 0, about to fetch for initial data update, then will set interval', )
            setInitialFetch(true)
            dispatch(getUpdateFunc({
                ...dispatchData,
                take,
                skip: 0,
                time: initialFetchTime
            }))
        }
    }, [dispatchData, dispatch, take, initialFetchTime, getUpdateFunc, initialFetch, scrollY])

    //set interval to make update fetch 
    useEffect(() => {
        if (interval && initialFetchTime && scrollY < 450 && isPageVisible && !updateInterval.current) {
            // console.log('about to set interval to fetch update for ', stateKey)
            
            updateInterval.current = setInterval(getCompositeDataUpdate, 30000)
        }

        return () => {
            if (updateInterval.current) {
                // console.log('about to clear interval for fetch update for ', stateKey, ' because dependencies updated')
                clearInterval(updateInterval.current)
                updateInterval.current = null
            }
        }
    }, [interval, scrollY, initialFetchTime, dispatch, dispatchData, getUpdateFunc, stateKey, take, isPageVisible])

}

useCompositeDataUpdate.propTypes = {
    getUpdateFunc: PropTypes.func.isRequired, 
    stateKey: PropTypes.string.isRequired, 
    take: PropTypes.number, 
    dispatchData: PropTypes.object, 
    interval: PropTypes.bool
}

useCompositeDataUpdate.defaultProps = {
    interval: true,
    take: 5,
    dispatchData: {}
}

export default useCompositeDataUpdate
