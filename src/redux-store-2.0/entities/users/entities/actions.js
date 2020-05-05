import { USER_TOGGLE_FOLLOW } from '../../../action-types'

export const userToggleFollow = (data) => ({
    type: USER_TOGGLE_FOLLOW,
    userId: data.userId,
    authedUser: data.authedUser
})
