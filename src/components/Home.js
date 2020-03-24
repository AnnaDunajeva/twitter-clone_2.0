import React, {useCallback} from 'react'
import {getFeedPaginated} from '../redux-store-2.0/api/tweets'
import {getFeedIds } from '../redux-store-2.0/composite-data/selectors'
import {homeKey} from '../redux-store-2.0/utils/compositeDataStateKeys'
import NewTweet from './NewTweet'
import TweetsList from './TweetsList'
import useAuthedUserCredentials from '../Hooks/useAuthedUserCredentials'

const Home = () => {
    const feedIds = useCallback(getFeedIds(), [])
    const dispatchData = useAuthedUserCredentials()

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

