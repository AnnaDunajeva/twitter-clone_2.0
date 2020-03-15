import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {toggleUserFollow} from '../redux-store-2.0/api/users'
import {getUserById} from '../redux-store-2.0/entities/users/selectors'

const UserCard = ({userId}) => {
    const user = useSelector(getUserById(userId))
    const dispatch = useDispatch()

    const handleFollowUnfollow = async () => {
        console.log('about to handle following')
        const data = {
            user: {
                userId: localStorage.getItem('userId'),
                token: localStorage.getItem('token')
            },
            userId: userId,
            following: user.following
        }
        await dispatch(toggleUserFollow(data)) 

        console.log('user: ', user) //user is still not updated here for some reason..idk
        // console.log('isFollowing: ', user.followers.includes(authedUser))
    }

    return (
        <div className='tweet-container'>
            {console.log('rendering user card')}
            <img src={user.avatar} alt={`Avatar for ${user.firstName} ${user.lastName}`} className='avatar'/>
            <div className='tweet-meta'>
                <Link to={`/user/${userId}`}>
                    <h3>{`${user.firstName} ${user.lastName}`}</h3>
                </Link>
                <div className='meta-text'>@{userId}</div>
                <div className='meta-text'>Following {user.followingsCount} | Followers {user.followersCount}</div>
            </div>
            <div className='btn-follow-container'>
                <button className={`btn-usercard btn-${user.following ? 'unfollow' : 'follow'}`} onClick={handleFollowUnfollow}> {user.following ? 'Unfollow' : "Follow"} </button>
            </div>
        </div>
    )
}

export default withRouter(UserCard)