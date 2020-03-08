import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {handleAddFollowing, handleDeleteFollowing} from '../redux-store/actions/users'

const UserCard = ({userId}) => {
    const user = useSelector(state => state.users[userId])
    const authedUser = useSelector(state => state.authedUser)
    const isFollowing = user.followers.includes(authedUser)
    // const [isFollowing, setIsFollowing] = useState(user.followers.includes(authedUser))
    const dispatch = useDispatch()

    const handleFollowUnfollow = async () => {
        console.log('about to handle following')
        const data = {
            user: {
                userId: localStorage.getItem('userId'),
                token: localStorage.getItem('token')
            },
            userId: userId
        }
        isFollowing ? await dispatch(handleDeleteFollowing(data)) : await dispatch(handleAddFollowing(data))
        // console.log('dispathced, setting following in state')
        // setIsFollowing(user.followers.includes(authedUser))
        console.log('user: ', user) //user is still not updated here for some reason..idk
        // console.log('isFollowing: ', user.followers.includes(authedUser))
    }

    return (
        <div className='tweet-container'>
            {console.log('rendering user card')}
            <img src={user.avatarURL} alt={`Avatar for ${user.name}`} className='avatar'/>
            <div className='tweet-meta'>
                <Link to={`/user/${userId}`}>
                    <h3>{user.name}</h3>
                </Link>
                <div className='meta-text'>@{userId}</div>
                <div className='meta-text'>Following {user.followings.length} | Followers {user.followers.length}</div>
            </div>
            <div className='btn-follow-container'>
                <button className={`btn-usercard btn-${isFollowing ? 'unfollow' : 'follow'}`} onClick={handleFollowUnfollow}> {isFollowing ? 'Unfollow' : "Follow"} </button>
            </div>
        </div>
    )
}

export default withRouter(UserCard)