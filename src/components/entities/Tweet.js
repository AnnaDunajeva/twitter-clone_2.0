import React, {useRef, useState, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeart } from "react-icons/ti";
import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs'
import videoUrlParser from "js-video-url-parser";
import YouTube from 'react-youtube'
import { ReactTinyLink } from 'react-tiny-link'
import {getTweetLikesIds} from '../../redux-store-2.0/composite-data/selectors'
import {tweetLikesKey} from '../../redux-store-2.0/utils/compositeDataStateKeys'
import {getTweetLikesPaginated} from '../../redux-store-2.0/api/tweets'
import {getTweetById} from '../../redux-store-2.0/entities/tweets/selectors'
import {getUserById} from '../../redux-store-2.0/entities/users/selectors'
import {toggleTweetsLike, deleteTweet} from '../../redux-store-2.0/api/tweets'
import {MdClose} from "react-icons/md"
import useSubscribeToTweetUpdate from '../../Hooks/useSubscribeToTweetUpdate'
import {getUserIdFromCookie} from '../../utils/helpers'
import {formatDate} from '../../utils/helpers'
import UsersList from '../lists/UsersList'
import ListPopUp from '../modals/ListPopUp'
import DeleteAlert from '../modals/DeleteAlert'
import IconButton from '../styles/IconButton'
import CoverAllLink from '../styles/CoverAllLink'
import EntityContainer from '../styles/EntityContainer'
import Link from '../styles/Link'

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
    history, 
    stateKey
}) => {
    const dispatch = useDispatch()
    const tweet = useSelector(getTweetById(id))
    const author = useSelector(getUserById(tweet?.user))
    const authedUser = getUserIdFromCookie()

    const [isDeleteTweet, setIsDeleteTweet] = useState(false)
    const [showLikes, setShowLikes] = useState(false)

    const tweetLikesSelector = useCallback(getTweetLikesIds(id), [])

    const urlsInTweet = useRef(tweet?.text 
                                ? linkify.find(tweet.text).filter(urlObj => urlObj.type === 'url')
                                : null) //maybe useMemo instead?
    const youtubeUrls = useRef(tweet?.text 
                                ? urlsInTweet.current
                                    .map(urlObj => videoUrlParser.parse(urlObj.href))
                                    .filter(videoData => videoData !== undefined && videoData.provider === 'youtube')
                                :null
                                )

    const dispatchData = {
        tweetId: id
    }
    
    useSubscribeToTweetUpdate(tweet)

    const handleLike = (e) => {
        e.preventDefault()
        dispatch(toggleTweetsLike({
            tweetId: id,
            // ...userCredentials,
        }))
    }
    const handleDelete = () => { //async?
        dispatch(deleteTweet({
            tweetId: id,
            // ...userCredentials,
            stateKey
        }))
        setIsDeleteTweet(false)
    }
    
    const toParent = () => {
        history.push(`/tweet/${tweet.replyingToTweetId}`)
    }
    
    const toProfile = () => handleToProfile 
        ? handleToProfile(tweet.user) 
        : history.push(`/user/${tweet.user}`)
    
    const toTweet = () => handleToTweetPage 
        ? handleToTweetPage(id) 
        : history.push(`/tweet/${id}`)

    return (
        <React.Fragment>
            {isDeleteTweet && 
                <DeleteAlert 
                    onDelete={handleDelete} 
                    onClose={()=>setIsDeleteTweet(false)} 
                    message={'Are you sure you want to delete this tweet?'}
                    smallMessage={'You will not be able to restore it.'}
                />
            }
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
            {tweet?.deleted 
                ? <div className='tweet-container' style={{justifyContent: 'center'}}>
                    <p style={{padding: '20px'}}>[Deleted]</p>
                </div>
                : <React.Fragment>
                    <EntityContainer>
                        <CoverAllLink onClick={toTweet}/>

                        <img 
                            src={author.avatar} 
                            alt={`Avatar for ${author.firstName} ${author.lastName}`} 
                            className='avatar position-relative clickable'
                            tabIndex={0}
                            onClick={toProfile} 
                        />

                        <div className='tweet-meta'>
                            {authedUser === author.userId && 
                                <IconButton 
                                    onClick={() => setIsDeleteTweet(true)} 
                                    circle pale size={'36px'} float={'right'}>
                                        <MdClose size={27}/>
                                </IconButton>
                            }
                            <Link 
                                onClick={toProfile}>
                                    <span className='user-name'>{`${author.firstName} ${author.lastName} `}</span>
                                    <span className='meta-text'>@{author.userId}</span>
                            </Link>
                            
                            <div className='meta-text'>{formatDate(tweet.createdAt)}</div>
                            {tweet.replyingToTweetId !== null && 
                                <Link secondary
                                    onClick={toTweet}>
                                            {tweet.replyingToUserId 
                                                ? `Replying to @${tweet.replyingToUserId}` 
                                                : 'Replying to [deleted]'
                                            }
                                </Link>
                            }

                            <Linkify 
                                tagName="p" 
                                className='text' 
                                options={linkifyOptions}>
                                    {tweet.text}
                            </Linkify>
                            
                            {tweet.media &&
                                <img 
                                    src={tweet.media} 
                                    className='tweet-image' 
                                    alt=''
                                    style={{width: 400, height: 400, borderRadius: 2}}
                                />
                            }
                            {/* {urlsInTweet.current?.length > 0
                                ?<div style={{margin: ' 0 0 15px 0', width: '430px'}}>
                                    {
                                        urlsInTweet.current.map(urlObj => 
                                            <ReactTinyLink
                                                cardSize="small"
                                                showGraphic={true}
                                                maxLine={2}
                                                minLine={1}
                                                url={urlObj.href}
                                                key = {urlObj.href}
                                            />
                                        )
                                    }
                                </div>
                                :null
                            } */}

                            {youtubeUrls.current?.length > 0 
                                ?<YouTube
                                    videoId={youtubeUrls.current[0].id}
                                    opts={{height: '262', width: '430'}}
                                    className='position-relative margin-bottom'
                                />
                                :null
                            }

                            <div className='respons-container'> 
                                <IconButton 
                                    onClick={toTweet} 
                                    circle size={'36px'} >
                                    <TiArrowBackOutline size={27}/>
                                </IconButton>

                                {tweet.repliesCount !== 0 
                                    ?<IconButton 
                                        onClick={toTweet}
                                        pale padding={'8px 10px'} fontSize={'17px'}>
                                            {tweet.repliesCount}
                                    </IconButton>
                                    :<div style={{width:'30px'}}></div>}

                                <IconButton 
                                    onClick={handleLike}
                                    circle size={'36px'} liked={!!tweet.liked}>
                                        {tweet.liked ? <TiHeart size={27}/> : <TiHeartOutline size={27}/>}
                                </IconButton>

                                {tweet.likesCount !== 0 &&
                                    <IconButton 
                                        onClick={() => setShowLikes(true)} 
                                        pale padding={'8px 10px'} fontSize={'17px'}>
                                            {tweet.likesCount}
                                    </IconButton>}
                            </div>
                        </div>
                    </EntityContainer>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default withRouter(Tweet)