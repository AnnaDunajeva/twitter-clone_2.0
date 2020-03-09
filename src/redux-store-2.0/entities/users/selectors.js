import { pick } from 'lodash'

export const getUserById = (userId) => {
    return (state) => state.entities.users.entities[userId]
}

export const getUserStatusById = (userId) => {
    return (state) => state.entities.users.fetchStatus[userId]
}

export const getUserErrorById = (userId) => {
    return (state) => state.entities.users.errors[userId]
}

export const getUsersByIdsReturnObject = (state, userIds) => {
    return pick(state.entities.users.entities, userIds)
}

export const getUsersByIdsReturnArray = (state, userIds) => {
    return userIds.map(userId => state.entities.users.entities[userId])
}