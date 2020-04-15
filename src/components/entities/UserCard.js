import React from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {toggleUserFollow} from '../../redux-store-2.0/api/users'
import {getUserById} from '../../redux-store-2.0/entities/users/selectors'
import useSubscribeToUserUpdate from '../../Hooks/useSubscribeToUserUpdate'
import {getUserIdFromCookie} from '../../utils/helpers'

const UserCard = ({userId, style, handleToProfile, showFollowButton}) => {
    // const userCredentials= useAuthedUserCredentials()
    const authedUser = getUserIdFromCookie()
    const user = useSelector(getUserById(userId))
    const dispatch = useDispatch()
    const history = useHistory()

    useSubscribeToUserUpdate(user)

    const handleFollowUnfollow = async () => {
        console.log('about to handle following')
        const data = {
            // ...userCredentials,
            userId: userId,
            following: user.following
        }
        await dispatch(toggleUserFollow(data)) 

        console.log('user: ', user) //user is still not updated here for some reason..idk
    }

    return (
        <div className='tweet-container clickable' style={style}>
            <img 
                src={user.avatar} 
                alt={`Avatar for ${user.firstName} ${user.lastName}`} 
                className='avatar'
            />
            <div className='tweet-meta'>
                <div 
                    onClick={handleToProfile 
                        ? () =>handleToProfile(userId) 
                        : ()=>history.push(`/user/${userId}`)
                        } 
                    className='pseudo-link clickable'>
                </div>
                <h3>{`${user.firstName} ${user.lastName}`}</h3>
                <div className='meta-text'>@{userId}</div>
                <div className='meta-text'>
                        Following {user.followingsCount} | Followers {user.followersCount}
                </div>
            </div>
            {userId !== authedUser && 
                <div className='btn-follow-container'>
                    <button 
                        className={`btn-usercard btn-${user.following ? 'unfollow' : 'follow'} position-relative`} 
                        onClick={handleFollowUnfollow}
                    > 
                        {user.following ? 'Unfollow' : "Follow"} 
                    </button>
                </div>
            }
        </div>
    )
}

export default UserCard