import React, {useCallback} from 'react'
import {getFeedPaginated} from '../../redux-store-2.0/api/tweets'
import {getFeedIds } from '../../redux-store-2.0/composite-data/selectors'
import {homeKey} from '../../redux-store-2.0/utils/compositeDataStateKeys'
// import {getFeedUpdate} from '../../redux-store-2.0/api/tweets'
// import useCompositeDataUpdate from '../../Hooks/useCompositeDataUpdate'
import NewTweet from '../entities/NewTweet'
import TweetsList from '../lists/TweetsList'
import EntityBackgroundContainer from '../styles/EntityBackgroundContainer'

const Home = () => {
    const feedIds = useCallback(getFeedIds(), [])
    const dispatchData = {}

    return (
        <React.Fragment>
            <EntityBackgroundContainer>
                <NewTweet showHeader={false}/>
            </EntityBackgroundContainer>
            <EntityBackgroundContainer>
                <TweetsList 
                    stateSelector={feedIds}
                    take={15} 
                    stateKey={(homeKey())}
                    dispatchData={dispatchData} 
                    getDataFetch={getFeedPaginated}
                    getUpdateFunc={getFeedPaginated}
                    interval={true} 
                    headerText={'Your Timeline'}/>
            </EntityBackgroundContainer>
        </React.Fragment>
    )
}

export default Home

