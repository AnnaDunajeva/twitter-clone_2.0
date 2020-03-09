import { keyedReducer } from '../utils/keyedReducer'
import { 
    COMPOSITE_DATA_ENTITIES_FETCH, 
    COMPOSITE_DATA_ENTITIES_FETCH_SUCCESS, 
    COMPOSITE_DATA_ENTITIES_FETCH_ERROR,
    SESSION_END_SUCCESS,
    NEW_TWEET_ADD_TO_FEED
} 
from '../action-types'
import { homeKey } from '../utils/compositeDataStateKeys'

const initialState = {
    entities: [],
    fetchStatus: null,
    lastTopFetchTimestamp: null,
    error: null,
    paginationConfig: {
        hasMore: true,
        previousIdsLength: 0
    }
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
                    sortindex: state.entities[0].sortindex - 1
                }
                return {
                    ...state,
                    fetchStatus: action.fetchStatus,
                    entities: [tweet].concat(state.entities)
                }
            } else {
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