import { pick, pickBy } from 'lodash'

export const getTweetById = (tweetId) => {
    return (state) => state.entities.tweets.entities[tweetId]
}

export const getAllTweetsIds = () => (state) => Object.keys(state.entities.tweets.entities)

export const getTweetStatusById = (tweetId) => {
    return (state) => state.entities.tweets.fetchStatus[tweetId]
}

export const getTweetErrorById = (tweetId) => {
    return (state) => state.entities.tweets.errors[tweetId]
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