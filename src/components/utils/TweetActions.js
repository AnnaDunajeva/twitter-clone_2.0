import React from 'react'
import {TweetActionsContainer, TweetActionsContainerSecondary} from '../styles/TweetActions'
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeart } from "react-icons/ti";
import IconButton from '../styles/IconButton'


const TweetActions = ({
    secondary, 
    tweet, 
    toTweet, 
    handleLike,
    showLikes
}) => {

    return (
        <TweetActionsContainer as={secondary ? TweetActionsContainerSecondary : 'div'}> 
            <IconButton 
                onClick={toTweet} 
                circle size={'36px'} margin={'0 3px 0 0'}>
                    <TiArrowBackOutline size={27}/>
            </IconButton>

            {tweet.repliesCount !== 0 
            ?<IconButton 
                onClick={toTweet}
                pale={secondary ? false : true} padding={'8px 10px'} margin={'0 3px 0 0'} fontSize={'17px'} size={secondary && '60px'} bold={secondary ? true : false}>
                    {tweet.repliesCount}
            </IconButton>
            :<div style={{width:'30px'}}></div>}

            <IconButton 
                onClick={handleLike}
                circle size={'36px'} liked={!!tweet.liked} margin={'0 3px 0 0'}>
                    {tweet.liked ? <TiHeart size={27}/> : <TiHeartOutline size={27}/>}
            </IconButton>

            {tweet.likesCount !== 0 &&
            <IconButton 
                onClick={showLikes} 
                pale={secondary ? false : true} padding={'8px 10px'} margin={'0 3px 0 0'} fontSize={'17px'} size={secondary && '60px'} bold={secondary ? true : false}>
                    {tweet.likesCount}
            </IconButton>}
        </TweetActionsContainer>
    )
}

export default TweetActions

