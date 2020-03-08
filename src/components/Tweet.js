import React, {useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {formatDate, formatTweet} from '../utils/helpers'
import {Link, withRouter} from 'react-router-dom'
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeart } from "react-icons/ti";
import { handleToggleLike } from '../redux-store/actions/tweets'
import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs'
import videoUrlParser from "js-video-url-parser";
import YouTube from 'react-youtube'
import { ReactTinyLink } from 'react-tiny-link'

const linkifyOptions = {
    validate: {
        email: false,
        url: true
    }
}

const Tweet = ({id, history}) => {
    const dispatch = useDispatch()

    const tweet = useSelector(({tweets, users, authedUser}) => {
        const tweet = tweets[id]
        const author = users[tweets[id].author]
        const parentTweet = tweet.replyingTo 
            ? tweets[tweet.replyingTo] //is parent tweet in store? (e.g in tweetpage all replies are to the same main tweet)
                ? tweets[tweet.replyingTo] //take it
                : tweet.replyingTo //otherwise it has to be attached to tweet
            : null

        return {authedUser, ...formatTweet(tweet, author, authedUser, parentTweet)}
    })

    const urlsInTweet = useRef(linkify.find(tweet.text).filter(urlObj => urlObj.type === 'url')) //maybe useMemo instead?
    const youtubeUrls = useRef(urlsInTweet.current
                                .map(urlObj => videoUrlParser.parse(urlObj.href))
                                .filter(videoData => videoData !== undefined && videoData.provider === 'youtube')
                                )


    const handleLike = (e) => {
        e.preventDefault()
        dispatch(handleToggleLike({
            hasLiked: !tweet.hasLiked,
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
            {console.log('tweetId ', id)}
            {console.log('urlsInTweet.current ', urlsInTweet.current)}
            {console.log('outubeUrls.current ', youtubeUrls.current)}
            <div className='tweet-container'>
                <Link to={`/tweet/${id}`} className='pseudo-link'></Link>

                <img src={tweet.avatar} alt={`Avatar for ${tweet.name}`} className='avatar'/>

                <div className='tweet-meta'>
                    <Link to={`/user/${tweet.userId}`} className='user-name'>
                        {tweet.name}
                    </Link>

                    <div className='meta-text'>{formatDate(tweet.timestamp)}</div>

                    {tweet.parent !== null && 
                        <Link to={`/tweet/${tweet.parent.id}`} 
                            className='meta-text' 
                        >
                            {`Replying to @${tweet.parent.author}`}
                        </Link>
                    }
                    <Linkify tagName="p" className='text' options={linkifyOptions}>{tweet.text}</Linkify>
                    {/* <p className='text'>{tweet.text}</p> */}
                    
                    {urlsInTweet.current.length > 0
                        ?<div style={{margin: ' 0 0 15px 0', width: '430px'}}>
                            {
                                urlsInTweet.current.map(urlObj => 
                                    <ReactTinyLink
                                        cardSize="small"
                                        showGraphic={true}
                                        maxLine={2}
                                        minLine={1}
                                        url={urlObj.href}
                                    />
                                )
                            }
                        </div>
                        :null
                    }

                    {youtubeUrls.current.length > 0 
                        ?<YouTube
                            videoId={youtubeUrls.current[0].id}
                            opts={{height: '262', width: '430'}}
                            className='position-relative margin-bottom'
                        />
                        :null
                    }

                    <div className='respons-container'> 
                        <Link to={`/tweet/${id}`} >
                            <TiArrowBackOutline className='icon'/>
                        </Link>

                        <div className='respons'>{tweet.replies !== 0 ? tweet.replies : null}</div>

                        <button className='btn-clear' onClick={handleLike}>
                            {tweet.hasLiked 
                                ? <TiHeart className='icon liked' />
                                : <TiHeartOutline className='icon' />
                            }
                        </button>

                        <div className='respons'>{tweet.likes !== 0 ? tweet.likes : null}</div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default withRouter(Tweet)