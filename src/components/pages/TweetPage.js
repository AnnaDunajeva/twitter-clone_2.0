import React from 'react'
import {useSelector} from 'react-redux'
import {getConversationRepliesIds, getConversationMainTweetId} from '../../redux-store-2.0/composite-data/selectors'
import {conversationKey} from '../../redux-store-2.0/utils/compositeDataStateKeys'
import {getConversationPaginated} from '../../redux-store-2.0/api/tweets'
import {getTweetStatusById, getTweetErrorById, getTweetById} from '../../redux-store-2.0/entities/tweets/selectors'
import {LOADED, NOT_FOUND} from '../../redux-store-2.0/constants'
import {getConversationUpdate} from '../../redux-store-2.0/api/tweets'
import NewTweet from '../entities/NewTweet'
import Tweet from '../entities/Tweet'
import NotFound from '../pages/NotFound'
import TweetsList from '../lists/TweetsList'
import EntityBackgroundContainer from '../styles/EntityBackgroundContainer'
import {ReplyContainer} from '../styles/NewTweet'
    
const TweetPage = (props) => {
    const tweetId = props.match.params.id
    const take = 15
    
    const mainTweet = useSelector(getTweetById(tweetId)) 
    const mainTweetFetchStatus = useSelector(getTweetStatusById(tweetId))
    const mainTweetFetchError = useSelector(getTweetErrorById(tweetId))
    const conversationMainTweetId = useSelector(getConversationMainTweetId(tweetId))

    const repliesSelector = getConversationRepliesIds((tweetId))

    const dispatchData = {
        tweetId,
        getMainTweet: conversationMainTweetId ? false : true
    }
    
    if (mainTweetFetchError === NOT_FOUND) {
        return (
            <NotFound />
        )
    } 

    return (
        <EntityBackgroundContainer>
            {mainTweetFetchStatus === LOADED &&
                <React.Fragment>
                    <Tweet id={tweetId} stateKey={conversationKey(tweetId)}/>
                    {!mainTweet?.deleted && 
                        <ReplyContainer>
                            <NewTweet replyingTo={tweetId}/>
                        </ReplyContainer>
                    }
                </React.Fragment>
            }

            <TweetsList 
                getDataFetch={getConversationPaginated} 
                getUpdateFunc={getConversationUpdate}
                dispatchData={dispatchData} 
                stateSelector={repliesSelector}
                stateKey={conversationKey(tweetId)}
                take={take} 
                interval={true}
                headerText={'Replies'} 
                noDataText={mainTweet?.deleted ? '' : 'No replies yet!'}  
            />
        </EntityBackgroundContainer>
    )
}

export default TweetPage
