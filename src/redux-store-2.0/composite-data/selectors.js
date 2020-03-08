
//return array of entities with their metadata
export const getCompositeDataEntities = (state, stateKey) => {
    return state.compositeData[stateKey].entities
}

export const getCompositeDataFetchStatus = (state, stateKey) => {
    return state.compositeData[stateKey].fetchStatus
}

export const getCompositeDataError = (state, stateKey) => {
    return state.compositeData[stateKey].error
}

export const getCompositeDataEntityIds = () => {

}

export const getConversationMainTweetId = (state, stateKey) => {
    //assumes data is already sorted by sortIndex
    return state.compositeData[stateKey].entities[0].tweetId 
}

export const getConversationRepliesIds = (state, stateKey) => {
    //assumes data is already sorted by sortIndex
    return state.compositeData[stateKey].entities.slice(1).map(tweetData => tweetData.tweetId)
}

