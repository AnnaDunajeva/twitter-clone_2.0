import React, {useRef, useState, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs'
import videoUrlParser from "js-video-url-parser";
import YouTube from 'react-youtube'
import {getTweetLikesIds} from '../../redux-store-2.0/composite-data/selectors'
import {tweetLikesKey} from '../../redux-store-2.0/utils/compositeDataStateKeys'
import {getTweetLikesPaginated} from '../../redux-store-2.0/api/tweets'
import {getTweetById} from '../../redux-store-2.0/entities/tweets/selectors'
import {getUserById} from '../../redux-store-2.0/entities/users/selectors'
import {toggleTweetsLike, deleteTweet} from '../../redux-store-2.0/api/tweets'
import {MdClose} from "react-icons/md"
import useSubscribeToTweetUpdate from '../../Hooks/useSubscribeToTweetUpdate'
import {getAuthedUserId} from '../../redux-store-2.0/session/selectors'
import {formatDate} from '../../utils/helpers'
import UsersList from '../lists/UsersList'
import ListPopUp from '../modals/ListPopUp'
import DeleteAlert from '../modals/DeleteAlert'
import TweetActions from '../utils/TweetActions'
import IconButton from '../styles/IconButton'
import CoverAllLink from '../styles/CoverAllLink'
import EntityContainer from '../styles/EntityContainer'
import Link from '../styles/Link'
import {AvatarSmall} from '../styles/Avatar'
import MetaText from '../styles/MetaText'
import TweetText from '../styles/TweetText'
import TweetImage from '../styles/TweetImage'
import {truncateText} from '../../utils/helpers'
import useWindowSize from '../../Hooks/useWindowSize'

const linkifyOptions = {
    validate: {
        email: false,
        url: true
    }
}

const Tweet = ({
    id, 
    handleToTweetPage, 
    handleToProfile, 
    stateKey
}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {width} = useWindowSize()
    const tweet = useSelector(getTweetById(id))
    const author = useSelector(getUserById(tweet?.user))
    const authedUser = useSelector(getAuthedUserId())

    const [isDeleteTweet, setIsDeleteTweet] = useState(false)
    const [showLikes, setShowLikes] = useState(false)

    const tweetLikesSelector = useCallback(getTweetLikesIds(id), [])

    const urlsInTweet = useRef(tweet?.text 
                                ? linkify.find(tweet.text).filter(urlObj => urlObj.type === 'url')
                                : null) 
    const youtubeUrls = useRef(tweet?.text 
                                ? urlsInTweet.current
                                    .map(urlObj => videoUrlParser.parse(urlObj.href))
                                    .filter(videoData => videoData !== undefined && videoData.provider === 'youtube')
                                :null
                                )

    const dispatchData = {tweetId: id}
    
    useSubscribeToTweetUpdate(tweet)

    const handleLike = (e) => {
        e.preventDefault()
        dispatch(toggleTweetsLike({tweetId: id}))
    }
    const handleDelete = () => { 
        dispatch(deleteTweet({
            tweetId: id,
            stateKey
        }))
        setIsDeleteTweet(false)
    }
    
    const toProfile = () => handleToProfile 
        ? handleToProfile(tweet.user) 
        : history.push(`/user/${tweet.user}`)
    
    const toTweet = (id) => handleToTweetPage 
        ? handleToTweetPage(id) 
        : history.push(`/tweet/${id}`)

    return (
        <React.Fragment>
            {isDeleteTweet && 
            <DeleteAlert 
                onDelete={handleDelete} 
                onClose={()=>setIsDeleteTweet(false)} 
                message={'Are you sure you want to delete this tweet?'}
                smallMessage={'You will not be able to restore it.'}/>}

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
            </ListPopUp>}

            {tweet?.deleted 
            ?<EntityContainer style={{justifyContent: 'center'}}>
                <p style={{padding: '20px'}}>[Deleted]</p>
            </EntityContainer>
            :<EntityContainer>
                <CoverAllLink onClick={()=>toTweet(id)}/>

                <AvatarSmall 
                    src={author.avatar} 
                    alt={`Avatar for ${author.firstName} ${author.lastName}`} 
                    onClick={toProfile} />

                <div>
                    {authedUser === author.userId && 
                    <IconButton 
                        onClick={() => setIsDeleteTweet(true)} 
                        circle pale size={'36px'} margin={'0 10px'}
                        style={{position: 'absolute', right: '0'}}>
                            <MdClose size={27}/>
                    </IconButton>}

                    <Link 
                        as='div'
                        onClick={toProfile}>
                            <h3>{author.firstName.length + author.lastName.length + 1 > (width > 500 ? 38 : 28)
                                ?truncateText(`${author.firstName} ${author.lastName}`, (width > 500 ? 35 : 25))
                                :`${author.firstName} ${author.lastName}`
                                }
                            </h3>
                            <MetaText as='span'> @{author.userId}</MetaText>
                    </Link>
                    
                    <MetaText>{formatDate(tweet.createdAt)}</MetaText>

                    {tweet.replyingToTweetId !== null && 
                    <Link 
                        as={MetaText}
                        onClick={()=>toTweet(tweet.replyingToTweetId)}>
                            {tweet.replyingToUserId 
                            ? `Replying to @${tweet.replyingToUserId}` 
                            : 'Replying to [deleted]'}
                    </Link>}

                    <TweetText as={Linkify} tagName="p" options={linkifyOptions}>
                        {tweet.text}
                    </TweetText>
                    
                    {tweet.media &&
                    <TweetImage 
                        src={tweet.media} />}

                    {youtubeUrls.current?.length > 0 &&
                    <div style={{position: 'relative'}}>
                        <YouTube
                            videoId={youtubeUrls.current[0].id}
                            opts={{height: '262', width: '430'}}/>
                    </div>}

                    <TweetActions 
                        tweet={tweet}
                        toTweet={()=>toTweet(id)}
                        handleLike={handleLike}
                        showLikes={()=>setShowLikes(true)}/>

                </div>
            </EntityContainer>
            }
        </React.Fragment>
    )
}
Tweet.propTypes = {
    id: PropTypes.number.isRequired, 
    handleToTweetPage: PropTypes.func, 
    handleToProfile: PropTypes.func, 
    stateKey: PropTypes.string.isRequired
}

export default Tweet
