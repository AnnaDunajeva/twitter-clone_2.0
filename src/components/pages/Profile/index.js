import React, {useEffect, useCallback, useMemo, useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getUserById, getUserStatusById, getUserErrorById} from '../../../redux-store-2.0/entities/users/selectors'
import {getUser} from '../../../redux-store-2.0/api/users'
import {NOT_FOUND, LOADED, UPDATED, ERROR} from '../../../redux-store-2.0/constants'
import {userTweetsKey, userTweetLikesKey, userRepliesKey} from '../../../redux-store-2.0/utils/compositeDataStateKeys'
import {getUserTweetIds, getUserTweetLikesIds, getUserRepliesIds} from '../../../redux-store-2.0/composite-data/selectors'
import {getUserTweetsPaginated, getUserTweetLikesPaginated, getUserRepliesPaginated} from '../../../redux-store-2.0/api/tweets'
import useSubscribeToUserUpdate from '../../../Hooks/useSubscribeToUserUpdate'
import {getUserIdFromCookie} from '../../../utils/helpers'
import ProfileCard from './ProfileCard'
import ProfileNav from './ProfileNav'
import NotFound from '../NotFound'
import TweetsList from '../../lists/TweetsList'
import PrivateRoute from '../../utils/PrivateRoute'
import ImageList from '../../lists/ImagesList'
import EntityBackgroundContainer from '../../styles/EntityBackgroundContainer'

const Profile = (props) => {
    const authedUserId = getUserIdFromCookie()
    const userId = props.match.params.userId
    const user = useSelector(getUserById(userId))
    const userFetchStatus = useSelector(getUserStatusById(userId))
    const userFetchError = useSelector(getUserErrorById(userId))
    const [toUpdate, setToUpdate] = useState(false)
    const [toTweetPageId, setToTweetPageId] = useState(null)
    const [toProfileId, setToProfileId] = useState(null)

    const userTweetsSelector = useCallback(getUserTweetIds(userId), []) //not sure if I need it
    const userTweetLikesSelector = useCallback(getUserTweetLikesIds(userId), [])
    const userRepliesSelector = useCallback(getUserRepliesIds(userId), [])

    const tweetsKey = userTweetsKey(userId)
    const tweetLikesKey =  userTweetLikesKey(userId)
    const repliesKey = userRepliesKey(userId)

    const dispatch = useDispatch()

    const dispatchData = useMemo(()=>({userId}), [userId])

    useSubscribeToUserUpdate(user)

    useEffect(() => {
        //in future needs to be redone using Suspense, which is not implemented in react yet
        const asyncDispatch = async () => {
            await dispatch(getUser({userId}))
        }
        if (!userFetchStatus && userId !== authedUserId) {
            console.log('making fetch for profile, userFetchStatus: ', userFetchStatus)
            asyncDispatch();
        }
    }, [dispatch, userId, userFetchStatus, authedUserId])

    //maybe make hook for it?
    useEffect(() => {
        if (toUpdate) {
            props.history.push(`/profile/update`)
        }
    }, [toUpdate, props.history])
    useEffect(() => {
        if (toTweetPageId) {
            props.history.push(`/tweet/${toTweetPageId}`)
        }
    }, [toTweetPageId, props.history])
    useEffect(() => {
        if (toProfileId) {
            props.history.push(`/user/${toProfileId}`)
        }
    }, [toProfileId, props.history])

    if (userFetchError === NOT_FOUND) {
        return <NotFound />
    } 

    return (
        <Router>
            {console.log('rendering profile page', 'userFetchStatus ', userFetchStatus)}
            {console.log('profile: ', user)}
            {console.log('props.match.url ', props.match.url)}
            {userFetchStatus === ERROR && 
                <EntityBackgroundContainer>
                    <h3>
                        Oops, could not load profile data. Please try again.
                    </h3>
                </EntityBackgroundContainer>
            }
            {userFetchStatus === LOADED || userFetchStatus === UPDATED ?
                <React.Fragment>
                    <ProfileCard user={user} setToUpdate={setToUpdate} handleToProfile={setToProfileId}/>
                    <ProfileNav url={props.match.url}/>
                    <EntityBackgroundContainer profile={'true'}>
                        <Switch>
                            <PrivateRoute 
                                path={`${props.match.path}`} exact 
                                component={TweetsList} 
                                additionalProps={{
                                    handleToTweetPage: setToTweetPageId, 
                                    handleToProfile: setToProfileId, 
                                    stateSelector: userTweetsSelector, 
                                    getDataFetch: getUserTweetsPaginated, 
                                    stateKey: tweetsKey, 
                                    dispatchData}}/>
                            <PrivateRoute 
                                path={`${props.match.path}/replies`} 
                                component={TweetsList} 
                                additionalProps={{
                                    handleToTweetPage: setToTweetPageId, 
                                    handleToProfile: setToProfileId, 
                                    stateSelector: userRepliesSelector, 
                                    getDataFetch: getUserRepliesPaginated, 
                                    stateKey: repliesKey, 
                                    dispatchData}}/>
                            <PrivateRoute 
                                path={`${props.match.path}/likes`} 
                                component={TweetsList} 
                                additionalProps={{
                                    handleToTweetPage: setToTweetPageId, 
                                    handleToProfile: setToProfileId, 
                                    stateSelector: userTweetLikesSelector, 
                                    getDataFetch: getUserTweetLikesPaginated, 
                                    stateKey: tweetLikesKey, 
                                    dispatchData}}/>
                            <PrivateRoute 
                                path={`${props.match.path}/photos`} 
                                component={ImageList} 
                                additionalProps={{
                                    userId: userId, 
                                    handleToTweetPage: setToTweetPageId, 
                                    handleToProfile: setToProfileId, 
                                    dispatchData}}/>
                            <Route component={NotFound} />
                        </Switch>
                    </EntityBackgroundContainer>
                </React.Fragment>
                : null
            }
        </Router>
    )
}

export default Profile