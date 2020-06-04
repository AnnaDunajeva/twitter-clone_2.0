import {createStore, applyMiddleware} from 'redux'
import reducer from '../redux-store-2.0/reducer'
// import middleware from '../redux-store-2.0/middleware'
import thunk from 'redux-thunk'

/**
 * Return ShallowWrapper containing node(s) with the given data-test attribute value
 * @function findTestAttrInWrapper
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} value - Value of data-test attribute to find
 * @return {ShallowWrapper}
*/
export const findTestAttrInWrapper = (wrapper, value) => {
    return wrapper.find(`[data-test="${value}"]`) 
}

/**
 * Create a testing store with root reducer, inital state and middleware
 * @function storeFactory
 * @param {object} initialState - object, representing initial state of store
 * @return {Store} - Redux store
*/

export const storeFactory = (initialState) => {
    return createStore(reducer, initialState, applyMiddleware(thunk))
}

export const findAttrWithQueryselector = (container, value) => {
    return container.querySelector(`[data-test="${value}"]`) 
}