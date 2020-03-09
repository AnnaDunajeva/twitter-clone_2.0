import {GLOBAL_ERROR_ADD, GLOBAL_ERROR_REMOVE} from '../action-types'

export const globalErrorAdd = (actionName, errorMessage) => ({
    type: GLOBAL_ERROR_ADD,
    name: actionName,
    error: errorMessage
})

export const globalErrorRemove = (actionName) => ({
    type: GLOBAL_ERROR_REMOVE,
    name: actionName
})