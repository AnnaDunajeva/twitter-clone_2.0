import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import compositeData from './composite-data/reducer'
import entities from './entities/reducer'
import session from './session/reducer'
import errors from './errors/reducer'
import socket from './socket/reducer'

export default combineReducers({
    compositeData,
    entities,
    session,
    errors,
    socket,
    loadingBar: loadingBarReducer
}) 