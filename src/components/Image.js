import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getTweetById} from '../redux-store-2.0/entities/tweets/selectors'
import {toggleTweetsLike} from '../redux-store-2.0/api/tweets'
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeart } from "react-icons/ti";
import useHover from '../Hooks/useHover'
import useSubscribeToTweetUpdate from '../Hooks/useSubscribeToTweetUpdate'
import useAuthedUserCredentials from '../Hooks/useAuthedUserCredentials'

const Image = ({id, setToTweetPageId}) => {
    const dispatch = useDispatch()
    const tweet = useSelector(getTweetById(id))
    const {hovering, onMouseOver, onMouseOut} = useHover()
    const userCredentials = useAuthedUserCredentials()

    const handleLike = (e) => {
        e.preventDefault()
        dispatch(toggleTweetsLike({
            tweetId: id,
            ...userCredentials
        }))
    }

    useSubscribeToTweetUpdate(tweet)

    return (
        <div className='position-relative' onMouseEnter={onMouseOver} onMouseLeave={onMouseOut}>
            <img 
                src={tweet.media} 
                alt='' 
                className='tweet-image clickable' 
                style={{width: '100%', height: 'auto', borderRadius: 2}}
                onClick={()=>setToTweetPageId(tweet.id)}
            />
            {hovering && 
            <div className='respons-container' style={{width: '100%', position: 'absolute', bottom: '0', backgroundColor:'#eff5f8be', padding: '5px',  justifyContent: 'flex-end'}}> 
                <div onClick={()=>setToTweetPageId(tweet.id)} className='icon-container'>
                    <TiArrowBackOutline className='icon'/>
                </div>


                <div className='respons' style={{color:'#27292b'}}>{tweet.repliesCount !== 0 ? tweet.repliesCount : null}</div>

                <button className='btn-clear icon-container' onClick={handleLike}>
                    {tweet.liked 
                        ? <TiHeart className='icon liked' />
                        : <TiHeartOutline className='icon' />
                    }
                </button>

                <div className='respons' style={{color:'#27292b'}}>{tweet.likesCount !== 0 ? tweet.likesCount : null}</div>

            </div>
            }
        </div>
    )
}

export default Image

// import React, {useRef, useState} from 'react'
// import {useSelector, useDispatch} from 'react-redux'
// import {formatDate} from '../utils/helpers'
// import {Link, withRouter} from 'react-router-dom'
// import { TiArrowBackOutline } from "react-icons/ti";
// import { TiHeartOutline } from "react-icons/ti";
// import { TiHeart } from "react-icons/ti";
// import Linkify from 'linkifyjs/react';
// import * as linkify from 'linkifyjs'
// import videoUrlParser from "js-video-url-parser";
// import YouTube from 'react-youtube'
// import { ReactTinyLink } from 'react-tiny-link'
// import {getTweetById} from '../redux-store-2.0/entities/tweets/selectors'
// import {getUserById} from '../redux-store-2.0/entities/users/selectors'
// import {toggleTweetsLike} from '../redux-store-2.0/api/tweets'

// const linkifyOptions = {
//     validate: {
//         email: false,
//         url: true
//     }
// }

// const Tweet = ({id, handleToTweetPage, history}) => {
//     const dispatch = useDispatch()

//     const tweet = useSelector(getTweetById(id))
//     const author = useSelector(getUserById(tweet.user))

//     const urlsInTweet = useRef(linkify.find(tweet.text).filter(urlObj => urlObj.type === 'url')) //maybe useMemo instead?
//     const youtubeUrls = useRef(urlsInTweet.current
//                                 .map(urlObj => videoUrlParser.parse(urlObj.href))
//                                 .filter(videoData => videoData !== undefined && videoData.provider === 'youtube')
//                                 )


//     const handleLike = (e) => {
//         e.preventDefault()
//         dispatch(toggleTweetsLike({
//             tweetId: id,
//             user: {
//                 userId: localStorage.getItem('userId'),
//                 token: localStorage.getItem('token')
//             }
//         }))
//     }