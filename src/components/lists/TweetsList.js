import React from 'react'
import Tweet from '../entities/Tweet'
import ScrollUtil from '../utils/ScrollUtil'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const TweetsList = ({
    stateSelector, 
    getDataFetch, 
    stateKey, 
    dispatchData, 
    handleToTweetPage, 
    handleToProfile, 
    take, 
    headerText
}) => {    
    return (
        <ScrollUtil getDataFetch={getDataFetch} 
                    dispatchData={dispatchData} 
                    stateSelector={stateSelector}
                    take={take || 4} 
                    noDataText={'No tweets to show yet!'}
                    stateKey={stateKey}
                    headerText={headerText || null}
                    key={stateKey}
                    >
            {(ids)=>(
                <TransitionGroup component={null}>
                    {ids.map((id) => (
                        <CSSTransition
                            key={id}
                            appear={true}
                            timeout={{
                                appear: 300,
                                enter: 300,
                                exit: 1000
                            }}
                            classNames='item'
                            >
                                <Tweet 
                                    id={id} 
                                    key={id} 
                                    handleToTweetPage={handleToTweetPage} 
                                    handleToProfile={handleToProfile} 
                                    stateKey={stateKey}/>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            )}
        </ScrollUtil>
    )
}

export default TweetsList

