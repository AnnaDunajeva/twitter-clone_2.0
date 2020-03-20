import React, {useEffect, useCallback, useMemo, useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import ProfileCard from './ProfileCard'
import NotFound from './NotFound'
import {getUserById, getUserStatusById, getUserErrorById} from '../redux-store-2.0/entities/users/selectors'
import {getUser} from '../redux-store-2.0/api/users'
import {NOT_FOUND, LOADED, UPDATED} from '../redux-store-2.0/constants'
import ProfileNav from './ProfileNav'
import TweetsList from './TweetsList'
import ToBeImplemented from './ToBeImplemented'
import PrivateRoute from './PrivateRoute'
import {getUserTweetsPaginated, getUserTweetLikesPaginated, getUserRepliesPaginated} from '../redux-store-2.0/api/tweets'
import {getUserTweetIds, getUserTweetLikesIds, getUserRepliesIds} from '../redux-store-2.0/composite-data/selectors'
import {userTweetsKey, userTweetLikesKey, userRepliesKey} from '../redux-store-2.0/utils/compositeDataStateKeys'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import ImageList from './ImagesList'

const Profile = (props) => {
    const userId = props.match.params.userId
    const authedUser = useSelector(getAuthedUserId())
    const user = useSelector(getUserById(userId))
    const userFetchStatus = useSelector(getUserStatusById(userId))
    const userFetchError = useSelector(getUserErrorById(userId))
    const [toUpdate, setToUpdate] = useState(false)
    const [toTweetPageId, setToTweetPageId] = useState(null)
    const [toProfileId, setToProfileId] = useState(null)

    const userTweetsSelector = useCallback(getUserTweetIds(userId), []) //not sure if I need it
    const userTweetLikesSelector = useCallback(getUserTweetLikesIds(userId), [])
    const userRepliesSelector = useCallback(getUserRepliesIds(userId), [])

    const dispatch = useDispatch()

    const dispatchData = useMemo(()=>({
        user: {
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('token')
        },
        userId
    }), [userId])

    useEffect(() => {
        //in future needs to be redone using Suspense, which is not implemented in react yet
        const asyncDispatch = async () => {
            await dispatch(getUser(dispatchData))
        }
        asyncDispatch();
    }, [dispatch, userId, dispatchData])

    if (userFetchError === NOT_FOUND) {
        return <NotFound />
    } 
    if (toUpdate) {
        props.history.push(`/profile/update`)
    }
    if (toTweetPageId) {
        props.history.push(`/tweet/${toTweetPageId}`)
    }
    if (toProfileId) {
        props.history.push(`/user/${toProfileId}`)
    }

    return (
        <Router>
            {console.log('rendering profile page', 'userFetchStatus ', userFetchStatus)}
            {console.log('profile: ', user)}
            {console.log('props.match.url ', props.match.url)}
            {userFetchStatus === LOADED || userFetchStatus === UPDATED ?
                <React.Fragment>
                    <ProfileCard user={user} setToUpdate={setToUpdate}/>
                    <ProfileNav url={props.match.url}/>
                    <div className='profile-tweets big-container' style={{borderRadius: '2px', margin: '0px auto', alignSelf: 'stretch', width: 'initial', boxShadow: 'none'}}>
                        <Switch>
                            <PrivateRoute path={`${props.match.path}`} exact component={TweetsList} additionalProps={{handleToTweetPage: setToTweetPageId, stateSelector: userTweetsSelector, getDataFetch: getUserTweetsPaginated, stateKey: userTweetsKey(userId), dispatchData}}/>
                            <PrivateRoute path={`${props.match.path}/replies`} component={TweetsList} additionalProps={{handleToTweetPage: setToTweetPageId, handleToProfile: setToProfileId, stateSelector: userRepliesSelector, getDataFetch: getUserRepliesPaginated, stateKey: userRepliesKey(userId), dispatchData}}/>
                            <PrivateRoute path={`${props.match.path}/likes`} component={TweetsList} additionalProps={{handleToTweetPage: setToTweetPageId, handleToProfile: setToProfileId, stateSelector: userTweetLikesSelector, getDataFetch: getUserTweetLikesPaginated, stateKey: userTweetLikesKey(userId), dispatchData}}/>
                            <PrivateRoute path={`${props.match.path}/photos`} component={ImageList} additionalProps={{userId: userId, setToTweetPageId, dispatchData}}/>
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </React.Fragment>
                : null
            }
        </Router>
    )
}

export default Profile

// import React, {useEffect} from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import ProfileCard from './ProfileCard'
// import NotFound from './NotFound'
// import {getUserById, getUserStatusById, getUserErrorById} from '../redux-store-2.0/entities/users/selectors'
// import {getUser} from '../redux-store-2.0/api/users'
// import {NOT_FOUND, LOADED} from '../redux-store-2.0/constants'

// const Profile = (props) => {
//     const userId = props.match.params.userId

//     const user = useSelector(getUserById(userId))
//     const userFetchStatus = useSelector(getUserStatusById(userId))
//     const userFetchError = useSelector(getUserErrorById(userId))

//     const dispatch = useDispatch()

//     useEffect(() => {
//         //in future needs to be redone using Suspense, which is not implemented in react yet
//         let didCancel = false;
//         const asyncDispatch = async () => {
//             const data = {
//                 user: {
//                     userId: localStorage.getItem('userId'),
//                     token: localStorage.getItem('token')
//                 },
//                 userId
//             }

//             await dispatch(getUser(data))

//             if (!didCancel) {
//               }
//         }
//         asyncDispatch();
//         return () => { didCancel = true; };
//     }, [dispatch, userId])
    
//     if (userFetchError === NOT_FOUND) {
//         return <NotFound />
//     } 
//     return (
//         <React.Fragment>
//             {console.log('rendering profile page', 'userFetchStatus ', userFetchStatus)}
//             {console.log('profile: ', user)}
//             {userFetchStatus === LOADED || userFetchStatus === UPDATED
//                 ? <ProfileCard user={user}/>
//                 : null
//             }
//         </React.Fragment>
//     )
// }