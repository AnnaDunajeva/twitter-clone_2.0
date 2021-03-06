import { get, omit, mapValues  } from 'lodash';
import {SESSION_END_SUCCESS, TWEET_DELETE, TWEET_DELETE_EXEPT_REPLIES, USER_TOGGLE_FOLLOW} from '../action-types'
import { PENDING_UPDATE, LOADED } from '../constants';
import {conversationKey, userFollowingsKey, userFollowersKey} from './compositeDataStateKeys'
// import {getUserIdFromCookie} from '../../utils/helpers'
import {getAuthedUserId} from '../../redux-store-2.0/session/selectors'

/**
 * Creates a super-reducer as a map of reducers over keyed objects
 *
 * Use this when wanting to write reducers that operate
 * on a single object as if it lived in isolation when
 * really it lives in a map of similar objects referenced
 * by some predesignated key or id. T
 *
 * @example
 * const age = ( state = 0, action ) =>
 *     GROW === action.type
 *         ? state + 1
 *         : state
 *
 * const title = ( state = 'grunt', action ) =>
 *     PROMOTION === action.type
 *         ? action.title
 *         : state
 *
 * const userReducer = combineReducers( {
 *     age,
 *     title,
 * } )
 *
 * export default keyedReducer( 'username', userReducer )
 *
 * dispatch( { type: GROW, username: 'hunter02' } )
 *
 * state.users === {
 *     hunter02: {
 *         age: 1,
 *         title: 'grunt',
 *     }
 * }
 *
 * @param {string} keyPath lodash-style path to the key in action referencing item in state map
 * @param {Function} reducer applied to referenced item in state map
 * @returns {Function} super-reducer applying reducer over map of keyed items
 */
export const keyedReducer = ( keyPath, reducer ) => {
	// some keys are invalid
	if ( 'string' !== typeof keyPath ) {
		throw new TypeError(
			'Key name passed into '`keyedReducer`` must be a string but I detected a ${ typeof keyName }`
		);
	}
	if ( ! keyPath.length ) {
		throw new TypeError(
			'Key name passed into `keyedReducer` must have a non-zero length but I detected an empty string'
		);
	}
	if ( 'function' !== typeof reducer ) {
		throw new TypeError(
			'Reducer passed into '`keyedReducer`` must be a function but I detected a ${ typeof reducer }`
		);
	}

	return ( state = {}, action ) => {
		// don't allow coercion of key name: null => 0
		const itemKey = get( action, keyPath, undefined );

		//some action that need to be performed on multiple keys and where we dont want to create key if it wasnt in the store
		if (action.type === SESSION_END_SUCCESS) {
			//console.log(action)
			return {}
		}
		if (action.type === TWEET_DELETE) {
			//console.log('inside keyed reducer, about to remove tweet from composite data entities ', action)
			return mapValues(state, (value) => ({
				...value,
				entities: value.entities.filter(tweet => tweet.id !== parseInt(action.tweetId)),
				fetchStatus: value.done ? LOADED : PENDING_UPDATE //safeguard to avoid setting hasMore to false in scrollUtil
			}))
		}
		if (action.type === TWEET_DELETE_EXEPT_REPLIES) {
			//console.log('inside keyed reducer, got tweet update that tweet was deleted, about to remove it ', action)
			return mapValues(state, (value, key) => {
				if (key !== conversationKey(action.tweetId)) { //we want deleted parent tweet stay in composite data and be marked as deleted (it will come from update subscription)
					return {
						...value,
						entities: value.entities.filter(tweet => tweet.id !== parseInt(action.tweetId)),
						fetchStatus: value.done ? LOADED : PENDING_UPDATE
					}
				} 
				return value
			})
		}
		if (action.type === USER_TOGGLE_FOLLOW) {
			// const authedUser = getUserIdFromCookie()
			// const authedUser = getAuthedUserId()(state)
			const authedUser = action.authedUser
			return mapValues(state, (value, key) => {
				if (key === userFollowingsKey(authedUser)) {
					const ids = value.entities.map(user => user.userId) //also contain sortindex
					if (ids.includes(action.userId)) {
						//console.log('user wants to unfollow')
						return {
							...value,
							fetchStatus: value.done ? LOADED : PENDING_UPDATE,
							entities: value.entities.filter(user => user.userId !== action.userId)
						}
					} 
					// else {
					// 	console.log('user wants to follow')
					// 	const user = {
					// 		userId: action.userId,
					// 		sortindex: value[0]?.sortindex + 1 || Date.now()
					// 	}
					// 	return {
					// 		...value,
					// 		fetchStatus: value.done ? LOADED : PENDING_UPDATE,
					// 		entities: [user].concat(value.entities)
					// 	}
					// }
				}
				// if (key === userFollowersKey(action.userId)) {
				// 	const ids = value.entities.map(user => user.userId) //also contain sortindex
				// 	if (ids.includes(authedUser)) {
				// 		return {
				// 			...value,
				// 			fetchStatus: value.done ? LOADED : PENDING_UPDATE,
				// 			entities: value.entities.filter(user => user.userId !== authedUser)
				// 		}
				// 	} else {
				// 		const user = {
				// 			userId: authedUser,
				// 			sortindex: value[0]?.sortindex + 1 || Date.now()
				// 		}
				// 		return {
				// 			...value,
				// 			fetchStatus: value.done ? LOADED : PENDING_UPDATE,
				// 			entities: [user].concat(value.entities)
				// 		}
				// 	}
				// }
				return value
			})
		}
		
		// if (action.type === TWEET_DELETE) {
		// 	return mapValues(state, (value) => ({
		// 		...value,
		// 		entities: value.entities.map(tweet => tweet.id).includes(action.tweetId) ? [] : value.entities
		// 	}))
		// }

		if ( null === itemKey || undefined === itemKey ) {
			return state;
		}

		// we need this to update state 
		const oldItemState = state[ itemKey ]; // ok if undefined because inside reducer there is default state which will be used in this situation
		const newItemState = reducer( oldItemState, action );

		if ( newItemState === oldItemState ) {
			return state;
        }

		// remove key from state if setting to undefined 
		if ( undefined === newItemState ) {
			return state.hasOwnProperty( itemKey ) ? omit( state, itemKey ) : state;
		}

		return {
			...state,
			[ itemKey ]: newItemState,
		};
	};
};