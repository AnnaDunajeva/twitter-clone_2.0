import { USER_TOGGLE_FOLLOW } from '../../../action-types'

export const userToggleFollow = (userId) => ({
    type: USER_TOGGLE_FOLLOW,
    userId
})
