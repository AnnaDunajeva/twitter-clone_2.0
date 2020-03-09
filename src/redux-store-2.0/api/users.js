import { pick, mapValues } from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { 
    LOADED, 
    URL, 
    LOADING,
    NOT_FOUND,
    ERROR} from "../constants"

import { 
        usersFetch,
        usersFetchSuccess,
        usersFetchError } from '../entities/users/actions'
import { userToggleFollow } from '../entities/users/entities/actions'
import { globalErrorAdd, globalErrorRemove } from '../errors/actions'
import { 
        USERS_FETCH_ERROR,
        USER_TOGGLE_FOLLOW,
        COMPOSITE_DATA_ENTITIES_FETCH_ERROR } from '../action-types'
import { discoverUsersKey } from '../utils/compositeDataStateKeys'
import { 
    compositeDataEntitiesFetch, 
    compositeDataEntitiesFetchSuccess,
    compositeDataEntitiesFetchError } from '../composite-data/actions'

export function getUser (data) {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch(usersFetch([data.userId]), {[data.userId]: LOADING})
        dispatch(globalErrorRemove(`${USERS_FETCH_ERROR}/${data.userId}`))

        const userFetchStatusSuccess = {[data.userId]: LOADED}
        const userFetchStatusError = {[data.userId]: ERROR}

        try {
            const userResponse = await fetch(data.userId === data.user.userId ? `${URL}/user`:`${URL}/users/${data.userId}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                }
            })
            const userData = await userResponse.json()
            const user = userData.user

            if (Object.keys(user).length > 0) {
                dispatch(usersFetchSuccess(user, userFetchStatusSuccess))
            } else {
                dispatch(usersFetchError({[data.userId]: NOT_FOUND}, userFetchStatusError))
            }

            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)

            dispatch(usersFetchError({[data.userId]: err.message}, userFetchStatusError))
            dispatch(globalErrorAdd(`${USERS_FETCH_ERROR}/${data.userId}`), err.message) //do i even need this?

            dispatch(hideLoading())
        }
    }
}

export function toggleUserFollow (data) {
    return async (dispatch) => {
        dispatch(showLoading())
        dispatch(userToggleFollow(data.userId)) //provides instant UI feedback to user
        dispatch(globalErrorRemove(`${USER_TOGGLE_FOLLOW}/${data.userId}`))

        try {
            console.log(data, 'inside func toggleUserFollow')
            const usersResponse = await fetch(`${URL}/user/followings/${data.userId}`, {
                method: data.following ? 'DELETE' : 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                }
            })
            const users = await usersResponse.json()

            //maybe like with toggling like I should not update user profile rigth away so as to not confuse user If at the
            //same time somebody else followed same user and count will be more than plus 1...

            console.log(users)
            dispatch(hideLoading())
        }
        catch (err) { 
            console.log(err.message)

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
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.user.token}`
                }
            })
            const allUsers = await allUsersResponse.json()
            const users = allUsers.users

            const compositeDataUsers = Object.keys(users).map(userId => pick(users[userId], ['userId', 'sortindex'])).sort((a,b) => b.sortindex - a.sortindex)
            console.log('compositeDataUsers ', compositeDataUsers) 
           
            const usersFetchStatus = mapValues(users, () => LOADED)

            dispatch(usersFetchSuccess(users, usersFetchStatus))
            dispatch(compositeDataEntitiesFetchSuccess(discoverUsers, compositeDataUsers, data.time))

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