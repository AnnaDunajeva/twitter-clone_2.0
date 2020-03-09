import { keyedReducer } from '../utils/keyedReducer'
import { 
    COMPOSITE_DATA_ENTITIES_FETCH, 
    COMPOSITE_DATA_ENTITIES_FETCH_SUCCESS, 
    COMPOSITE_DATA_ENTITIES_FETCH_ERROR,
    SESSION_END_SUCCESS,
    NEW_TWEET_ADD_TO_FEED,
    NEW_TWEET_ADD_TO_REPLIES,
    NEW_TWEET_ADD_TO_USER_TWEETS
} 
from '../action-types'
import { homeKey, conversationKey, userTweetsKey } from '../utils/compositeDataStateKeys'

const initialState = {
    entities: [],
    fetchStatus: null,
    lastTopFetchTimestamp: null,
    error: null
}

const compositeData = (state = initialState, action) => {//keyedReducer chooses part of state with key value of stateKey
                                                            //so no additional checks required. Action determines which state part
                                                            //should be chousen: action.stateKey = 'someIdInCompositeDataState'
    switch (action.type) {
        case COMPOSITE_DATA_ENTITIES_FETCH:
            return {
                ...state,
                fetchStatus: action.fetchStatus,
                error: null
            }
        case COMPOSITE_DATA_ENTITIES_FETCH_SUCCESS:
            return {
                ...state,
                lastTopFetchTimestamp: action.lastTopFetchTimestamp || state.lastTopFetchTimestamp,
                entities: state.entities.concat(action.entities),
                fetchStatus: action.fetchStatus,
                error: null
            }
        case COMPOSITE_DATA_ENTITIES_FETCH_ERROR:
            return {
                ...state,
                fetchStatus: action.fetchStatus,
                lastTopFetchTimestamp: action.lastTopFetchTimestamp || state.lastTopFetchTimestamp,
                error: action.error
            }
        case NEW_TWEET_ADD_TO_FEED: //all this is veery hacky and bug prone
            if (action.stateKey === homeKey()) {
                const tweet = {
                    ...action.tweet,
                    sortindex: state.entities[0]?.sortindex - 1 || Date.now() //in case feed is empty. After recent modification if
                                                                                //feed is empty, then i dont add new tweet thereat all so no need for date.now
                }
                return {
                    ...state,
                    fetchStatus: action.fetchStatus,
                    entities: [tweet].concat(state.entities)
                }
            } else {
                return state
            }
        case NEW_TWEET_ADD_TO_REPLIES: 
            if (action.stateKey === conversationKey(action.parentId)) {
                const tweet = {
                    ...action.tweet,
                    sortindex: state.entities[1]?.sortindex - 1 || Date.now(),  // 0 index for main tweet
                    type: 'reply'
                }
                return {
                    ...state,
                    fetchStatus: action.fetchStatus,
                    entities: [state.entities[0], tweet, ...state.entities.slice(1)]
                }
            }else {
                return state
            }
        case NEW_TWEET_ADD_TO_USER_TWEETS:
            if (action.stateKey === userTweetsKey(action.author)) {
                const tweet = {
                    ...action.tweet,
                    sortindex: state.entities[0]?.sortindex - 1 || Date.now(), 
                }
                return {
                    ...state,
                    fetchStatus: action.fetchStatus,
                    entities: [tweet, ...state.entities]
                }
            }else {
                return state
            }
        case SESSION_END_SUCCESS:
            return initialState
        default: 
            return state
    }
}

export default keyedReducer('stateKey', compositeData) //returns function which has access to action.stateKey = 'someIdInCompositeDataState'

// export default combineReducers({
//     compositeData,  
// })