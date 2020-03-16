import React from 'react'
import Tweet from './Tweet'
import ScrollUtil from './ScrollUtil'

const TweetsList = ({stateSelector, getDataFetch, stateKey, dispatchData, handleToTweetPage}) => {    
    return (
        <ScrollUtil getDataFetch={getDataFetch} 
                    dispatchData={dispatchData} 
                    stateSelector={stateSelector}
                    take={4} 
                    noDataText={'No tweets to show yet!'}
                    stateKey={stateKey}
                    >
            {(ids)=>(
                <ul>
                    {ids.map((id) => (
                        <li key={id}>
                            <Tweet id={id} handleToTweetPage={handleToTweetPage}/>
                        </li>
                    ))}
                </ul>  
            )}
        </ScrollUtil>
    )
}

export default TweetsList

