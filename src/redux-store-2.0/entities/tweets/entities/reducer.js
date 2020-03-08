import { 
    TWEETS_FETCH_SUCCESS,
    TWEETS_REMOVE_ALL,
    TWEET_TOGGLE_LIKE,
    SESSION_END_SUCCESS
} 
from '../../../action-types'

export default function tweets () {
    return (state = {}, action) => {
        switch (action.type) {
            case TWEETS_FETCH_SUCCESS :
                return {
                    ...state,
                    ...action.entities
                }
            case TWEET_TOGGLE_LIKE: 
                return {
                    ...state,
                    [action.tweetId]: {
                        ...state[tweetId],
                        liked: !state[tweetId].liked,
                        likesCount: !state[tweetId].liked ? state[tweetId].likesCount + 1 : state[tweetId].likesCount - 1,
                    }
                }
            case TWEETS_REMOVE_ALL:
            case SESSION_END_SUCCESS:
                return {}
            default :
                return state
        } 
    }
}
