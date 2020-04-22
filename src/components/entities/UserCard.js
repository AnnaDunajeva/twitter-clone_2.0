import React from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {toggleUserFollow} from '../../redux-store-2.0/api/users'
import {getUserById} from '../../redux-store-2.0/entities/users/selectors'
import useSubscribeToUserUpdate from '../../Hooks/useSubscribeToUserUpdate'
import {getUserIdFromCookie} from '../../utils/helpers'
import MainButton from '../styles/MainButton'
import CoverAllLink from '../styles/CoverAllLink'
import EntityContainer from '../styles/EntityContainer'
import Link from '../styles/Link'
import {AvatarSmall} from '../styles/Avatar'
import MetaText from '../styles/MetaText'

const UserCard = ({userId, size, handleToProfile, showFollowButton}) => {
    const authedUser = getUserIdFromCookie()
    const user = useSelector(getUserById(userId))
    const dispatch = useDispatch()
    const history = useHistory()

    useSubscribeToUserUpdate(user)

    const handleFollowUnfollow = async () => {
        console.log('about to handle following')
        const data = {
            userId: userId,
            following: user.following
        }
        await dispatch(toggleUserFollow(data)) 

        console.log('user: ', user) //user is still not updated here for some reason..idk
    }

    const toProfile = () => handleToProfile 
        ? handleToProfile(userId) 
        : history.push(`/user/${userId}`)

    return ( 
        <EntityContainer size={size}>
            <CoverAllLink onClick={toProfile} />
            <AvatarSmall 
                src={user.avatar} 
                onClick={toProfile}
                alt={`Avatar for ${user.firstName} ${user.lastName}`} 
            />

            <div>
                <Link onClick={toProfile}>
                        <h3>{`${user.firstName} ${user.lastName}`}</h3>
                </Link>
                <MetaText>@{userId}</MetaText>
                <MetaText>
                        Following {user.followingsCount} | Followers {user.followersCount}
                </MetaText>
            </div>
            {userId !== authedUser && 
                <div className='btn-follow-container'>
                    {user.following
                        ?<MainButton onClick={handleFollowUnfollow} primary center small>Unfollow</MainButton>
                        :<MainButton onClick={handleFollowUnfollow} secondary center small>Follow</MainButton> }
                </div>
            }
        </EntityContainer>
    )
}

export default UserCard