import { pick, mapValues } from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { 
    LOADED, 
    URL, 
    LOADING,
    NOT_FOUND,
    ERROR,
    UPDATING,
    UPDATED} from "../constants"

import { 
        usersFetch,
        usersFetchSuccess,
        usersFetchError } from '../entities/users/actions'
import { userToggleFollow } from '../entities/users/entities/actions'
import { globalErrorAdd, globalErrorRemove } from '../errors/actions'
import { 
        USERS_FETCH_ERROR,
        USER_TOGGLE_FOLLOW,
        COMPOSITE_DATA_ENTITIES_FETCH_ERROR,
        PROFILE_UPDATE } from '../action-types'
import { discoverUsersKey, homeKey, userFollowingsKey, userFollowersKey, searchUserKey } from '../utils/compositeDataStateKeys'
import { 
    compositeDataEntitiesFetch, 
    compositeDataEntitiesFetchSuccess,
    compositeDataEntitiesFetchError,
    compositeDataClear } from '../composite-data/actions'
// import {getUserIdFromCookie} from '../../utils/helpers'
import { getAuthedUserId } from '../session/selectors'

export function getUser (data) {
    return async (dispatch, getState) => {
        const state = getState()
        const userId = getAuthedUserId()(state)
        console.log('inside getUser usersFetchstatus ', {[data.userId]: LOADING})
        dispatch(showLoading())
        dispatch(usersFetch([data.userId], {[data.userId]: LOADING}))
        dispatch(globalErrorRemove(`${USERS_FETCH_ERROR}/${data.userId}`))

        const userFetchStatusSuccess = {[data.userId]: LOADED}
        const userFetchStatusError = {[data.userId]: ERROR}

        try {
            const userResponse = await fetch(userId === data.userId ? `${URL}/user`:`${URL}/users/${data.userId}`, {
                method: 'GET',
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${data.user.token}`
                }
            })
            const userData = await userResponse.json()
            const user = userData.user

            if (userData.error) {
                dispatch(usersFetchError({[data.userId]: userData.error}, userFetchStatusError))
                dispatch(globalErrorAdd(`${USERS_FETCH_ERROR}/${data.userId}`, userData.error))
            } else {
                if (Object.keys(user).length > 0) {
                    dispatch(usersFetchSuccess(user, userFetchStatusSuccess))
                } else {
                    dispatch(usersFetchError({[data.userId]: NOT_FOUND}, userFetchStatusError))
                }
            }

            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)

            dispatch(usersFetchError({[data.userId]: err.message}, userFetchStatusError))
            dispatch(globalErrorAdd(`${USERS_FETCH_ERROR}/${data.userId}`, err.message)) //do i even need this?

            dispatch(hideLoading())
        }
    }
}

export function toggleUserFollow (data) {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch(userToggleFollow(data)) //provides instant UI feedback to user
        dispatch(globalErrorRemove(`${USER_TOGGLE_FOLLOW}/${data.userId}`))

        try {
            console.log(data, 'inside func toggleUserFollow')
            const usersResponse = await fetch(`${URL}/user/followings/${data.userId}`, {
                method: data.following ? 'DELETE' : 'PUT',
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, "$1"),
                }
            })
            const users = await usersResponse.json()

            if (users.error) {
                dispatch(userToggleFollow(data))
                dispatch(globalErrorAdd(`${USER_TOGGLE_FOLLOW}/${data.userId}`, users.error))
            } else {
                dispatch(compositeDataClear(homeKey()))
            }
            //maybe like with toggling like I should not update user profile rigth away so as to not confuse user If at the
            //same time somebody else followed same user and count will be more than plus 1...

            console.log(users)
            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)

            dispatch(userToggleFollow(data))
            dispatch(globalErrorAdd(`${USER_TOGGLE_FOLLOW}/${data.userId}`, err.message))

            dispatch(hideLoading())
        }
    }
}

export function getAllUsersPaginated (data) {
    return async (dispatch) => {
        dispatch(showLoading())

        const discoverUsers = discoverUsersKey()
        
        dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${discoverUsers}`))
        dispatch(compositeDataEntitiesFetch(discoverUsers))

        try {
            const allUsersResponse = await fetch(`${URL}/users?take=${data.take}&skip=${data.skip}&time=${data.time}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const allUsers = await allUsersResponse.json()

            if (allUsers.error) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${discoverUsers}`, allUsers.error))
                dispatch(compositeDataEntitiesFetchError(discoverUsers, allUsers.error, data.time))
            } else {
                const users = allUsers.users

                const compositeDataUsers = Object.keys(users).map(userId => pick(users[userId], ['userId', 'sortindex'])).sort((a,b) => a.sortindex - b.sortindex)
                console.log('compositeDataUsers ', compositeDataUsers) 
               
                const usersFetchStatus = mapValues(users, () => LOADED)
    
                dispatch(usersFetchSuccess(users, usersFetchStatus))
                dispatch(compositeDataEntitiesFetchSuccess(discoverUsers, compositeDataUsers, data.time))
            }

            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)
            dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${discoverUsers}`, err.message))
            dispatch(compositeDataEntitiesFetchError(discoverUsers, err.message, data.time))
                        
            dispatch(hideLoading())
        }
    }
}

// export function updateUser (data) {
//     return async (dispatch) => {
//         console.log(data)
//         dispatch(showLoading())
//         dispatch(globalErrorRemove(`${USER_UPDATE}`))
//         dispatch(usersFetch([data.user.userId], {[data.user.userId]: UPDATING}))
//         const userFetchStatusSuccess = {[data.user.userId]: UPDATED}
//         const userFetchStatusError = {[data.user.userId]: LOADED}

//         try {
//             // throw new Error ('Test')
//             const response = await fetch(`${URL}/user`, {
//                 method: 'PATCH',
//                 mode: 'cors',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${data.user.token}`
//                 },
//                 body: JSON.stringify(data.userData)
//             })
//             const userData = await response.json()

//             if (userData.error) {
//                 dispatch(globalErrorAdd(`${USER_UPDATE}`, userData.error))
//                 dispatch(usersFetchError({[data.user.userId]: userData.error}, userFetchStatusError))
                
//             } else {
//                 const user = userData.user
                
//                 dispatch(usersFetchSuccess(user, userFetchStatusSuccess))
//             }

//             dispatch(hideLoading())
//         }
//         catch (err) { 
//             console.log(err.message)

//             dispatch(globalErrorAdd(`${USER_UPDATE}`, err.message))
//             dispatch(usersFetchError({[data.user.userId]: err.message}, userFetchStatusError))

//             dispatch(hideLoading())
//         }
//     }
// }

export function updateProfile (data) {
    return async (dispatch, getState) => {
        const state = getState()
        const userId = getAuthedUserId()(state)
        console.log(data)
        dispatch(showLoading())
        dispatch(globalErrorRemove(`${PROFILE_UPDATE}`))
        dispatch(usersFetch([userId], {[userId]: UPDATING}))
        const userFetchStatusSuccess = {[userId]: UPDATED}
        const userFetchStatusError = {[userId]: LOADED}

        try {
            const formData = new FormData()
            if (data.file) {
                formData.append('file', data.file)
            }
            formData.append('user', JSON.stringify(data.userData))
            for (var key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }            
            // throw new Error ('Test')
            const response = await fetch(`${URL}/user`, {
                method: 'PATCH',
                // mode: 'cors',
                headers: {
                    'CSRF-Token': document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, "$1"),
                },
                body: formData
            })
            const userData = await response.json()

            if (userData.error) {
                dispatch(globalErrorAdd(`${PROFILE_UPDATE}`, userData.error))
                dispatch(usersFetchError({[userId]: userData.error}, userFetchStatusError))
                
            } else {
                const user = userData.user
                
                dispatch(usersFetchSuccess(user, userFetchStatusSuccess))
            }

            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)

            dispatch(globalErrorAdd(`${PROFILE_UPDATE}`, err.message))
            dispatch(usersFetchError({[userId]: err.message}, userFetchStatusError))

            dispatch(hideLoading())
        }
    }
}

export function deleteAvatar (data) {
    return async (dispatch, getState) => {
        const state = getState()
        dispatch(showLoading())
        const userId = getAuthedUserId()(state)
        dispatch(globalErrorRemove(`${PROFILE_UPDATE}`))
        dispatch(usersFetch([userId], {[userId]: UPDATING}))
        const userFetchStatusSuccess = {[userId]: UPDATED}
        const userFetchStatusError = {[userId]: LOADED}

        try {
            const response = await fetch(`${URL}/user/avatar`, {
                method: 'DELETE',
                // mode: 'cors',
                headers: {
                    'CSRF-Token': document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, "$1"),
                }
            })
            const userData = await response.json()

            if (userData.error) {
                dispatch(globalErrorAdd(`${PROFILE_UPDATE}`, userData.error))
                dispatch(usersFetchError({[userId]: userData.error}, userFetchStatusError))
                
            } else {
                const user = userData.user
                dispatch(usersFetchSuccess(user, userFetchStatusSuccess))
            }

            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)

            dispatch(globalErrorAdd(`${PROFILE_UPDATE}`, err.message))
            dispatch(usersFetchError({[userId]: err.message}, userFetchStatusError))

            dispatch(hideLoading())
        }
    }
}

export function deleteBackgroundImage (data) {
    return async (dispatch, getState) => {
        const state = getState()
        const userId = getAuthedUserId()(state)
        dispatch(showLoading())
        dispatch(globalErrorRemove(`${PROFILE_UPDATE}`))
        dispatch(usersFetch([userId], {[userId]: UPDATING}))
        const userFetchStatusSuccess = {[userId]: UPDATED}
        const userFetchStatusError = {[userId]: LOADED}

        try {
            const response = await fetch(`${URL}/user/background`, {
                method: 'DELETE',
                // mode: 'cors',
                headers: {
                    'CSRF-Token': document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, "$1"),
                }
            })
            const userData = await response.json()

            if (userData.error) {
                dispatch(globalErrorAdd(`${PROFILE_UPDATE}`, userData.error))
                dispatch(usersFetchError({[userId]: userData.error}, userFetchStatusError))
                
            } else {
                const user = userData.user
                dispatch(usersFetchSuccess(user, userFetchStatusSuccess))
            }

            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)

            dispatch(globalErrorAdd(`${PROFILE_UPDATE}`, err.message))
            dispatch(usersFetchError({[data.user.userId]: err.message}, userFetchStatusError))

            dispatch(hideLoading())
        }
    }
}

export const getUserFollowingsPaginated = (data) => async (dispatch) => {
    dispatch(showLoading())

    const userFollowings = userFollowingsKey(data.userId)
    
    dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${userFollowings}`))
    dispatch(compositeDataEntitiesFetch(userFollowings))

    try {
        const usersResponseData = await fetch(`${URL}/user/${data.userId}/followings?take=${data.take}&skip=${data.skip}&time=${data.time}`, {
            method: 'GET',
            // mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${data.user.token}`
            }
        })
        const usersResponse = await usersResponseData.json()

        if (usersResponse.error) {
            dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${userFollowings}`, usersResponse.error))
            dispatch(compositeDataEntitiesFetchError(userFollowings, usersResponse.error, data.time))
        } else {
            const users = usersResponse.users

            const compositeDataUsers = Object.keys(users).map(userId => pick(users[userId], ['userId', 'sortindex'])).sort((a,b) => b.sortindex - a.sortindex)
            console.log('compositeDataUserFollowings ', compositeDataUsers) 
            
            const usersFetchStatus = mapValues(users, () => LOADED)

            dispatch(usersFetchSuccess(users, usersFetchStatus))
            dispatch(compositeDataEntitiesFetchSuccess(userFollowings, compositeDataUsers, data.time))
        }

        dispatch(hideLoading())
    }
    catch (err) { 
        console.log(err.message)
        dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${userFollowings}`, err.message))
        dispatch(compositeDataEntitiesFetchError(userFollowings, err.message, data.time))
                    
        dispatch(hideLoading())
    }
}

export const getUserFollowersPaginated = (data) => {
    return async (dispatch) => {
        console.log('inside getUserFollowersPaginated')
        dispatch(showLoading())
    
        const userFollowers = userFollowersKey(data.userId)
        
        dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${userFollowers}`))
        dispatch(compositeDataEntitiesFetch(userFollowers))
    
        try {
            const usersResponseData = await fetch(`${URL}/user/${data.userId}/followers?take=${data.take}&skip=${data.skip}&time=${data.time}`, {
                method: 'GET',
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${data.user.token}`
                }
            })
            const usersResponse = await usersResponseData.json()
    
            if (usersResponse.error) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${userFollowers}`, usersResponse.error))
                dispatch(compositeDataEntitiesFetchError(userFollowers, usersResponse.error, data.time))
            } else {
                const users = usersResponse.users
    
                const compositeDataUsers = Object.keys(users).map(userId => pick(users[userId], ['userId', 'sortindex'])).sort((a,b) => b.sortindex - a.sortindex)
                console.log('compositeDataUserFollowers ', compositeDataUsers) 
                
                const usersFetchStatus = mapValues(users, () => LOADED)
    
                dispatch(usersFetchSuccess(users, usersFetchStatus))
                dispatch(compositeDataEntitiesFetchSuccess(userFollowers, compositeDataUsers, data.time))
            }
    
            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)
            dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${userFollowers}`, err.message))
            dispatch(compositeDataEntitiesFetchError(userFollowers, err.message, data.time))
                        
            dispatch(hideLoading())
        }
    }
}

export const findUserPaginated = (data) => {
    return async (dispatch) => {
        dispatch(showLoading())

        const searchUser = searchUserKey(data.userId)
        
        dispatch(globalErrorRemove(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${searchUser}`))
        dispatch(compositeDataEntitiesFetch(searchUser))

        try {
            const usersResponse = await fetch(`${URL}/users/find/${data.userId}?take=${data.take}&skip=${data.skip}&time=${data.time}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const foundUsers = await usersResponse.json()
            console.log('foundUsers: ', foundUsers)

            if (foundUsers.error) {
                dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${searchUser}`, foundUsers.error))
                dispatch(compositeDataEntitiesFetchError(searchUser, foundUsers.error, data.time))
            } else {
                const users = foundUsers.users

                const compositeDataUsers = Object.keys(users).map(userId => pick(users[userId], ['userId', 'sortindex'])).sort()
                console.log('compositeDataUsers ', compositeDataUsers) 
               
                const usersFetchStatus = mapValues(users, () => LOADED)
    
                dispatch(usersFetchSuccess(users, usersFetchStatus))
                dispatch(compositeDataEntitiesFetchSuccess(searchUser, compositeDataUsers, data.time))
            }

            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)
            dispatch(globalErrorAdd(`${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${searchUser}`, err.message))
            dispatch(compositeDataEntitiesFetchError(searchUser, err.message, data.time))
                        
            dispatch(hideLoading())
        }
    }
}
