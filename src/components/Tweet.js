import React, {useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {formatDate} from '../utils/helpers'
import {Link, withRouter} from 'react-router-dom'
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeart } from "react-icons/ti";
import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs'
import videoUrlParser from "js-video-url-parser";
import YouTube from 'react-youtube'
import { ReactTinyLink } from 'react-tiny-link'
import {getTweetById} from '../redux-store-2.0/entities/tweets/selectors'
import {getUserById} from '../redux-store-2.0/entities/users/selectors'
import {toggleTweetsLike} from '../redux-store-2.0/api/tweets'

const linkifyOptions = {
    validate: {
        email: false,
        url: true
    }
}

const Tweet = ({id}) => {
    const dispatch = useDispatch()

    const tweet = useSelector(getTweetById(id))
    const author = useSelector(getUserById(tweet.user))

    const urlsInTweet = useRef(linkify.find(tweet.text).filter(urlObj => urlObj.type === 'url')) //maybe useMemo instead?
    const youtubeUrls = useRef(urlsInTweet.current
                                .map(urlObj => videoUrlParser.parse(urlObj.href))
                                .filter(videoData => videoData !== undefined && videoData.provider === 'youtube')
                                )


    const handleLike = (e) => {
        e.preventDefault()
        dispatch(toggleTweetsLike({
            tweetId: id,
            user: {
                userId: localStorage.getItem('userId'),
                token: localStorage.getItem('token')
            }
        }))
    }
    // const toParent = (e, id) => {
    //     e.preventDefault()
    //     history.push(`/tweet/${id}`)
    // }

    return (
        <React.Fragment>
            <div className='tweet-container'>
                <Link to={`/tweet/${id}`} className='pseudo-link'></Link>

                <img src={author.avatar} alt={`Avatar for ${author.firstName} ${author.lastName}`} className='avatar'/>

                <div className='tweet-meta'>
                    <Link to={`/user/${author.userId}`} className='user-name'>
                        {`${author.firstName} ${author.lastName}`}
                    </Link>

                    <div className='meta-text'>{formatDate(tweet.createdAt)}</div>

                    {tweet.replyingToTweetId !== null && 
                        <Link to={`/tweet/${tweet.replyingToTweetId}`} 
                            className='meta-text' 
                        >
                            {`Replying to @${tweet.replyingToUserId}`}
                        </Link>
                    }
                    <Linkify tagName="p" className='text' options={linkifyOptions}>{tweet.text}</Linkify>
                    {/* <p className='text'>{tweet.text}</p> */}
                    
                    {/* {urlsInTweet.current.length > 0
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

                    {youtubeUrls.current.length > 0 
                        ?<YouTube
                            videoId={youtubeUrls.current[0].id}
                            opts={{height: '262', width: '430'}}
                            className='position-relative margin-bottom'
                        />
                        :null
                    }

                    <div className='respons-container'> 
                        <Link to={`/tweet/${id}`} className='icon-container'>
                            <TiArrowBackOutline className='icon'/>
                        </Link>

                        <div className='respons'>{tweet.repliesCount !== 0 ? tweet.repliesCount : null}</div>

                        <button className='btn-clear icon-container' onClick={handleLike}>
                            {tweet.liked 
                                ? <TiHeart className='icon liked' />
                                : <TiHeartOutline className='icon' />
                            }
                        </button>

                        <div className='respons'>{tweet.likesCount !== 0 ? tweet.likesCount : null}</div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default withRouter(Tweet)