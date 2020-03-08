import { TWEET_TOGGLE_LIKE } from '../../../action-types'

export const tweetToggleLike = (tweetId) => ({
    type: TWEET_TOGGLE_LIKE,
    tweetId
})