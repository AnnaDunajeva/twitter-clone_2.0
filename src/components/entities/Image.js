import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getTweetById} from '../../redux-store-2.0/entities/tweets/selectors'
import {toggleTweetsLike} from '../../redux-store-2.0/api/tweets'
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeart } from "react-icons/ti";
import useHover from '../../Hooks/useHover'
import useSubscribeToTweetUpdate from '../../Hooks/useSubscribeToTweetUpdate'

const Image = ({id, handleToTweetPage}) => {
    const dispatch = useDispatch()
    const tweet = useSelector(getTweetById(id))
    const {hovering, onMouseOver, onMouseOut} = useHover()

    const handleLike = (e) => {
        e.preventDefault()
        dispatch(toggleTweetsLike({
            tweetId: id
        }))
    }

    useSubscribeToTweetUpdate(tweet)

    return (
        <div 
            className='position-relative' 
            onMouseEnter={onMouseOver} 
            onMouseLeave={onMouseOut}>
            <img 
                src={tweet.media} 
                alt='' 
                className='tweet-image clickable' 
                style={{width: '100%', height: 'auto', borderRadius: 2}}
                onClick={()=>handleToTweetPage(tweet.id)}
            />
            {hovering && 
            <div 
                className='respons-container' 
                style={{width: '100%', position: 'absolute', bottom: '0', backgroundColor:'#eff5f8be', padding: '5px',  justifyContent: 'flex-end'}}> 
                <div onClick={()=>handleToTweetPage(tweet.id)} className='icon-container'>
                    <TiArrowBackOutline className='icon'/>
                </div>


                <div 
                    className='respons' 
                    style={{color:'#27292b'}}>
                        {tweet.repliesCount !== 0 
                            ? tweet.repliesCount 
                            : null}
                </div>

                <button className='btn-clear icon-container' onClick={handleLike}>
                    {tweet.liked 
                        ? <TiHeart className='icon liked' />
                        : <TiHeartOutline className='icon' />
                    }
                </button>

                <div 
                    className='respons' 
                    style={{color:'#27292b'}}>
                        {tweet.likesCount !== 0 
                            ? tweet.likesCount 
                            : null}
                </div>

            </div>
            }
        </div>
    )
}

export default Image

