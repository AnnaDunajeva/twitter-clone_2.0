import entities from './entities/reducer'
import errors from './errors/reducer'
import fetchStatus from './fetchStatus/reducer'
import { combineReducers } from "redux"

export default combineReducers({
    entities,
    errors,
    fetchStatus
})