import {homeKey, userTweetsKey, discoverUsersKey, conversationKey} from '../utils/compositeDataStateKeys'
//return array of entities with their metadata
export const getCompositeDataEntities = (stateKey) => {
    return (state) => state.compositeData[stateKey]?.entities || []
}

export const getCompositeDataFetchStatus = (stateKey) => {
    return (state) => state.compositeData[stateKey]?.fetchStatus || null
}

export const getCompositeDataError = (stateKey) => {
    return (state) => state.compositeData[stateKey]?.error || null
}

export const getCompositeDataPaginationConfig = (stateKey) => {
    return (state) => state.compositeData[stateKey]?.paginationCongif || null
}

export const getCompositeDataLastFetchTime= (stateKey) => {
    return (state) => state.compositeData[stateKey]?.lastTopFetchTimestamp || null
}

export const getFeedIds = () => {
    return (state) => state.compositeData[homeKey()]?.entities.map(tweetData => tweetData.id) || []
}

export const getUserTweetIds = (userId) => {
    return (state) => state.compositeData[userTweetsKey(userId)]?.entities.map(tweetData => tweetData.id) || []
}

export const getDiscoverUsersIds = () => {
    return (state) => state.compositeData[discoverUsersKey()]?.entities.map(userData => userData.userId) || []
}

export const getConversationMainTweetId = (tweetId) => {
    //assumes data is already sorted by sortIndex
    //otherwise i need to go through objects and find one where type is main tweet
    return (state) => state.compositeData[conversationKey(tweetId)]?.entities[0].id || null
}

export const getConversationRepliesIds = (tweetId) => {
    //assumes data is already sorted by sortIndex
    return (state) => state.compositeData[conversationKey(tweetId)]?.entities.slice(1).map(tweetData => tweetData.id) || [] //maybe add tweetData.type === 'reply' 
}

