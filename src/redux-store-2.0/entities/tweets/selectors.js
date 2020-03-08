import { pick, pickBy } from 'lodash'

export const getTweetById = (state, tweetId) => {
    return state.entities.tweets.entities[tweetId]
}

export const getTweetsByIdsReturnObject = (state, tweetIds) => {
    return pick(state.entities.tweets.entities, tweetIds)
}

export const getTweetsByIdsReturnArray = (state, tweetIds) => {
    return tweetIds.map(tweetId => state.entities.tweets.entities[tweetId])
}

export const getUserTweets = (state, userId) => {
    return pickBy(state.entities.tweets.entities, (tweet) => tweet.userId === userId)
}