import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ProfileCard from './ProfileCard'
import NotFound from './NotFound'
import {getUserById, getUserStatusById, getUserErrorById} from '../redux-store-2.0/entities/users/selectors'
import {getUser} from '../redux-store-2.0/api/users'
import {NOT_FOUND, LOADED} from '../redux-store-2.0/constants'

const Profile = (props) => {
    const userId = props.match.params.userId

    const user = useSelector(getUserById(userId))
    const userFetchStatus = useSelector(getUserStatusById(userId))
    const userFetchError = useSelector(getUserErrorById(userId))

    const dispatch = useDispatch()

    useEffect(() => {
        //in future needs to be redone using Suspense, which is not implemented in react yet
        let didCancel = false;
        const asyncDispatch = async () => {
            const data = {
                user: {
                    userId: localStorage.getItem('userId'),
                    token: localStorage.getItem('token')
                },
                userId
            }

            await dispatch(getUser(data))

            if (!didCancel) {
              }
        }
        asyncDispatch();
        return () => { didCancel = true; };
    }, [dispatch, userId])
    
    if (userFetchError === NOT_FOUND) {
        return <NotFound />
    } 
    return (
        <React.Fragment>
            {console.log('rendering profile page', 'userFetchStatus ', userFetchStatus)}
            {console.log('profile: ', user)}
            {userFetchStatus === LOADED 
                ? <ProfileCard user={user}/>
                : null
            }
        </React.Fragment>
    )
}

export default Profile