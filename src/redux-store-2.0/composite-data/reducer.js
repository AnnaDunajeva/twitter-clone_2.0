import { keyedReducer } from '../utils/keyedReducer'
import { 
    COMPOSITE_DATA_ENTITIES_FETCH, 
    COMPOSITE_DATA_ENTITIES_FETCH_SUCCESS, 
    COMPOSITE_DATA_ENTITIES_FETCH_ERROR,
    NEW_TWEET_ADD_TO_FEED,
    NEW_TWEET_ADD_TO_REPLIES,
    NEW_TWEET_ADD_TO_USER_TWEETS,
    COMPOSITE_DATA_CLEAR,
    NEW_TWEET_ADD_TO_USER_REPLIES,
    NEW_TWEET_ADD_TO_USER_IMAGES,
    NEW_LIKE_ADD_TO_USER_LIKES,
    NEW_LIKE_REMOVE_FROM_USER_LIKES,
    COMPOSITE_DATA_SET_FETCH_STATUS,
    COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_SUCCESS,
    COMPOSITE_DATA_SET_DONE
} 
from '../action-types'
import { homeKey, conversationKey, userTweetsKey, userTweetImagesKey, userTweetLikesKey, userRepliesKey } from '../utils/compositeDataStateKeys'
import {LOADED, PENDING_UPDATE} from '../constants'

const initialState = {
    entities: [],
    fetchStatus: null,
    lastTopFetchTimestamp: null,
    error: null,
    done: false
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
        case COMPOSITE_DATA_ENTITIES_UPDATE_FETCH_SUCCESS:
            return {
                ...state,
                entities: action.entities.concat(state.entities)
            }
        case COMPOSITE_DATA_ENTITIES_FETCH_ERROR:
            return {
                ...state,
                fetchStatus: action.fetchStatus,
                lastTopFetchTimestamp: action.lastTopFetchTimestamp || state.lastTopFetchTimestamp,
                error: action.error
            }
        case COMPOSITE_DATA_SET_DONE:
            return {
                ...state,
                done: action.done
            }
        case NEW_TWEET_ADD_TO_FEED: //all this is veery hacky and bug prone
            if (action.stateKey === homeKey()) { //just to make sure you dont add tweet with wrong action and stateKey
                const tweet = {
                    ...action.tweet,
                    sortindex: state.entities[0]?.sortindex + 1 || Date.now() //in case feed is empty. After recent modification if
                                                                                //feed is empty, then i dont add new tweet there at all so no need for date.now
                                                                                //but i think its fine to leave just in case
                }
                return {
                    ...state,
                    // fetchStatus: action.fetchStatus,
                    entities: [tweet].concat(state.entities)
                }
            } else {
                return state
            }
        case NEW_TWEET_ADD_TO_REPLIES: 
            if (action.stateKey === conversationKey(action.parentId)) {
                const tweet = {
                    ...action.tweet,
                    sortindex: state.entities[0]?.sortindex + 1 || Date.now(),  // main tweet is last
                    type: 'reply'
                }
                return {
                    ...state,
                    // fetchStatus: action.fetchStatus,
                    entities: [tweet, ...state.entities]
                }
            }else {
                return state
            }
        case NEW_TWEET_ADD_TO_USER_TWEETS:
        case NEW_TWEET_ADD_TO_USER_REPLIES:
            if (action.stateKey === userTweetsKey(action.author) || action.stateKey === userRepliesKey(action.author)) {
                console.log('action.stateKey:  ', action.stateKey)
                const tweet = {
                    ...action.tweet,
                    sortindex: state.entities[0]?.sortindex + 1 || Date.now(), 
                }
                return {
                    ...state,
                    // fetchStatus: action.fetchStatus,
                    entities: [tweet, ...state.entities]
                }
            }else {
                return state
            }
        case NEW_TWEET_ADD_TO_USER_IMAGES:
            if (action.stateKey === userTweetImagesKey(action.author)) {
                const tweet = {
                    ...action.tweet,
                    sortindex: state.entities[0]?.sortindex + 1 || Date.now()
                }
                return {
                    ...state,
                    // fetchStatus: action.fetchStatus,
                    entities: [tweet, ...state.entities]
                }
            }else {
                return state
            }
        case NEW_LIKE_ADD_TO_USER_LIKES:
            if (action.stateKey === userTweetLikesKey(action.userId)) {
                const tweet = {
                    ...action.tweet,
                    sortindex: state.entities[0]?.sortindex + 1 || Date.now()
                }
                const filteresTweets = state.entities.filter(tweet => tweet.id !== action.tweet.id)
                return {
                    ...state,
                    fetchStatus: action.fetchStatus,
                    entities: [tweet, ...filteresTweets]
                }
            }else {
                return state
            }
        case NEW_LIKE_REMOVE_FROM_USER_LIKES:
            if (action.stateKey === userTweetLikesKey(action.userId)) {
                return {
                    ...state,
                    entities: state.entities.filter(tweet => tweet.id !== parseInt(action.tweetId)),
                    fetchStatus: state.done ? LOADED : PENDING_UPDATE //safeguard to avoid setting hasMore to false in scrollUtil
                }
            }else {
                return state
            }
        case COMPOSITE_DATA_SET_FETCH_STATUS:
            return {
                ...state,
                fetchStatus: action.fetchStatus
            }
        case COMPOSITE_DATA_CLEAR:
            return initialState
        default: 
            return state
    }
}

export default keyedReducer('stateKey', compositeData) //returns function which has access to action.stateKey = 'someIdInCompositeDataState'

// export default combineReducers({
//     compositeData,  
// })