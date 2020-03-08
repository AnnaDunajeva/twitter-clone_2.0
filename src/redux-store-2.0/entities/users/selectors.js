import { pick } from 'lodash'

export const getUserById = (state, userId) => {
    return state.entities.users.entities[userId]
}

export const getUsersByIdsReturnObject = (state, userIds) => {
    return pick(state.entities.users.entities, userIds)
}

export const getUsersByIdsReturnArray = (state, userIds) => {
    return userIds.map(userId => state.entities.users.entities[userId])
}