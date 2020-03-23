import { 
    TWEETS_FETCH_SUCCESS,
    TWEETS_REMOVE_ALL,
    TWEET_TOGGLE_LIKE,
    SESSION_END_SUCCESS,
    TWEET_UPDATE,
    NEW_TWEET_ADD_TO_REPLIES,
    TWEET_DELETE
} 
from '../../../action-types'
import {omit} from 'lodash'

export default function tweets (state = {}, action) {
    switch (action.type) {
        case TWEETS_FETCH_SUCCESS :
            return {
                ...state,
                ...action.tweets
            }
        case TWEET_TOGGLE_LIKE: 
            const tweetId = action.tweetId
            return {
                ...state,
                [tweetId]: {
                    ...state[tweetId],
                    liked: !state[tweetId].liked,
                    likesCount: !state[tweetId].liked ? state[tweetId].likesCount + 1 : state[tweetId].likesCount - 1,
                }
            }
        case TWEET_UPDATE: 
            return {
                ...state,
                [action.tweetId]: {
                    ...state[action.tweetId],
                    ...action.tweet[action.tweetId]
                }
            }
        // case TWEET_DELETE:
        //     return omit(state, action.tweetId) //dont forget about fetchStatus
        case TWEETS_REMOVE_ALL:
        case SESSION_END_SUCCESS:
            return {}
        // case NEW_TWEET_ADD_TO_REPLIES: 
        //     return {
        //         ...state,
        //         [action.parentId]: {
        //             ...state[action.parentId],
        //             repliesCount: state[action.parentId].repliesCount + 1
        //         }
        //     }
        default :
            return state
    } 
}

