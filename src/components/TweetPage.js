import React, {useCallback} from 'react'
import NewTweet from './NewTweet'
import Tweet from './Tweet'
import {useSelector} from 'react-redux'
import NotFound from './NotFound'
import {getConversationRepliesIds, getConversationMainTweetId} from '../redux-store-2.0/composite-data/selectors'
import {conversationKey} from '../redux-store-2.0/utils/compositeDataStateKeys'
import {getConversationPaginated} from '../redux-store-2.0/api/tweets'
import {getTweetStatusById, getTweetErrorById, getTweetById} from '../redux-store-2.0/entities/tweets/selectors'
import {LOADED, NOT_FOUND} from '../redux-store-2.0/constants'
import TweetsList from './TweetsList'
// import useAuthedUserCredentials from '../Hooks/useAuthedUserCredentials'
import {getConversationUpdate} from '../redux-store-2.0/api/tweets'
import useCompositeDataUpdate from '../Hooks/useCompositeDataUpdate'
    
const TweetPage = (props) => {
    const tweetId = props.match.params.id
    const take = 2
    
    // const userCredentials = useAuthedUserCredentials()
    const mainTweet = useSelector(getTweetById(tweetId)) 
    const mainTweetFetchStatus = useSelector(getTweetStatusById(tweetId))
    const mainTweetFetchError = useSelector(getTweetErrorById(tweetId))
    const conversationMainTweetId = useSelector(getConversationMainTweetId(tweetId))

    const repliesSelector = useCallback(getConversationRepliesIds((tweetId)), [])

    const dispatchData = {
        // ...userCredentials,
        tweetId,
        getMainTweet: conversationMainTweetId ? false : true
    }

    useCompositeDataUpdate({take: 1, dispatchData, getUpdateFunc: getConversationUpdate, stateKey: conversationKey(tweetId)})
    
    if (mainTweetFetchError === NOT_FOUND) {
        return (
            <NotFound />
        )
    } 

    return (
        <div className='big-container'>
            {console.log('rendering tweet page', 'mainTweetFetchStatus ', mainTweetFetchStatus)}
            {console.log('parent tweet', tweetId)}
            {mainTweetFetchStatus === LOADED &&
                <React.Fragment>
                    <Tweet id={tweetId} stateKey={conversationKey(tweetId)}/>
                    {!mainTweet?.deleted && 
                        <div style={{marginBottom: '15px'}}><NewTweet replyingTo={tweetId}/></div>
                    }
                </React.Fragment>
            }

            <TweetsList 
                getDataFetch={getConversationPaginated} 
                dispatchData={dispatchData} 
                stateSelector={repliesSelector}
                stateKey={conversationKey(tweetId)}
                take={take} 
                headerText={'Replies'} 
                noDataText={mainTweet?.deleted ? '' : 'No replies yet!'}  
            />
        </div>
    )
}

export default TweetPage
