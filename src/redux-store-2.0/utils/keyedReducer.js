import { get, omit  } from 'lodash';

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