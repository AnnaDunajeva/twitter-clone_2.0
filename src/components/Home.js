import React, {useCallback} from 'react'
import {useSelector} from 'react-redux'
import Tweet from './Tweet'
import {getFeedPaginated} from '../redux-store-2.0/api/tweets'
import ScrollUtil from './ScrollUtil'
import {getFeedIds } from '../redux-store-2.0/composite-data/selectors'
import {homeKey} from '../redux-store-2.0/utils/compositeDataStateKeys'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import NewTweet from './NewTweet'

const Home = () => {
    const authedUser = useSelector(getAuthedUserId())

    //NB! getting items from local storage can failt if user privacy settings does not allow to use local storage, needs to be wrapper
    //in try catch

    //should dispatchData and feedSelectorFunction be memorized?

    const dispatchData = {
        user: {
            userId: authedUser,
            token: localStorage.getItem('token')
        }
    }

    const feedIds = useCallback(getFeedIds(), [])
    // const feedFetchStatus = useCallback(getCompositeDataFetchStatus(homeKey()), [])
    // const lastFetchTime = useCallback(getCompositeDataLastFetchTime(homeKey()), [])
    
    return (
        <React.Fragment>
            <div className='big-container'>
                <NewTweet showHeader={false}/>
            </div>
            <div className='big-container'>
                <ScrollUtil getDataFetch={getFeedPaginated} 
                            dispatchData={dispatchData} 
                            stateSelector={feedIds}
                            // fetchStatusSelector={feedFetchStatus}
                            take={5} 
                            headerText={'Your Timeline'} 
                            noDataText={'No tweets to show yet!'}
                            // getLastFetchTime = {lastFetchTime}
                            stateKey={(homeKey())}
                            >
                    {(ids)=>(
                        <ul>
                            {ids.map((id) => (
                                <li key={id}>
                                    <Tweet id={id} stateKey={(homeKey())}/>
                                </li>
                            ))}
                        </ul>  
                    )}
                </ScrollUtil>
            </div>
        </React.Fragment>
    )
}

export default Home

