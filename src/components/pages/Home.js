import React from 'react'
import { getFeedPaginated } from '../../redux-store-2.0/api/tweets'
import { getFeedIds } from '../../redux-store-2.0/composite-data/selectors'
import { homeKey } from '../../redux-store-2.0/utils/compositeDataStateKeys'
import NewTweet from '../entities/NewTweet'
import TweetsList from '../lists/TweetsList'
import EntityBackgroundContainer from '../styles/EntityBackgroundContainer'

const Home = () => {
    const feedIds = getFeedIds()
    const dispatchData = {}

    return (
        <React.Fragment>
            <EntityBackgroundContainer data-test='newtweet-home'>
                <NewTweet showHeader={false}/>
            </EntityBackgroundContainer>
            <EntityBackgroundContainer data-test='component-home'>
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

