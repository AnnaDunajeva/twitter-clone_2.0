import React, {useState, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {getTweetById} from '../../redux-store-2.0/entities/tweets/selectors'
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeart } from "react-icons/ti";
import useHover from '../../Hooks/useHover'
import useSubscribeToTweetUpdate from '../../Hooks/useSubscribeToTweetUpdate'
import IconButton from '../styles/IconButton'
import {getTweetLikesIds} from '../../redux-store-2.0/composite-data/selectors'
import {tweetLikesKey} from '../../redux-store-2.0/utils/compositeDataStateKeys'
import {getTweetLikesPaginated} from '../../redux-store-2.0/api/tweets'
import {toggleTweetsLike, deleteTweet} from '../../redux-store-2.0/api/tweets'
import {MdClose} from "react-icons/md"
import UsersList from '../lists/UsersList'
import ListPopUp from '../modals/ListPopUp'
import TweetActions from '../utils/TweetActions'

const Image = ({id, handleToTweetPage, handleToProfile}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const tweet = useSelector(getTweetById(id))
    const {hovering, onMouseOver, onMouseOut} = useHover()
    const [showLikes, setShowLikes] = useState(false)

    const dispatchData = {
        tweetId: id
    }

    const tweetLikesSelector = useCallback(getTweetLikesIds(id), [])

    const handleLike = (e) => {
        e.preventDefault()
        dispatch(toggleTweetsLike({
            tweetId: id
        }))
    }
    const toTweet = () => handleToTweetPage 
        ? handleToTweetPage(id) 
        : history.push(`/tweet/${id}`)

    useSubscribeToTweetUpdate(tweet)

    return (
        <React.Fragment>
        {showLikes && tweet.likesCount !== 0 &&
            <ListPopUp 
                header={'Liked by'}
                id={tweetLikesKey(id)}
                key={tweetLikesKey(id)}
                onClose={()=>setShowLikes(false)}>
                <UsersList 
                    key={tweetLikesKey(id)}
                    handleToProfile={handleToProfile}
                    stateKey={tweetLikesKey(id)}
                    stateSelector={tweetLikesSelector}
                    dispatchData={dispatchData}
                    scrollableTarget={tweetLikesKey(id)}
                    getDataFetch={getTweetLikesPaginated}/>
            </ListPopUp>
        }
        <div 
            className='position-relative' 
            onMouseEnter={onMouseOver} 
            onMouseLeave={onMouseOut}>
            <img 
                src={tweet.media} 
                alt='' 
                className='tweet-image clickable' 
                style={{width: '100%', height: 'auto', borderRadius: 2}}
                tabIndex={0}
                onClick={()=>handleToTweetPage(tweet.id)}
            />
            {hovering && 
            <TweetActions 
                secondary={true}
                tweet={tweet}
                toTweet={toTweet}
                handleLike={handleLike}
                showLikes={() => setShowLikes(true)}
            />
            }
        </div>
        </React.Fragment>
    )
}

export default Image

