export const conversationKey = (tweetId) => {
    return `conversation-${tweetId}`
}

export const homeKey = () => {
    return 'home'
}

export const userTweetsKey = (userId) => {
    return `userTweets-${userId}`
}

export const discoverUsersKey = () => {
    return 'discoverUsers'
}

export const userTweetImagesKey = (userId) => {
    return `userTweetImages-${userId}`
}

export const userTweetLikesKey = (userId) => {
    return `userTweetLikes-${userId}`
}

export const userRepliesKey = (userId) => {
    return `userReplies-${userId}`
}