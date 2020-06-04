import React from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import {toggleUserFollow} from '../../redux-store-2.0/api/users'
import {getUserById} from '../../redux-store-2.0/entities/users/selectors'
import useSubscribeToUserUpdate from '../../Hooks/useSubscribeToUserUpdate'
import {getAuthedUserId} from '../../redux-store-2.0/session/selectors'
import MainButton from '../styles/MainButton'
import CoverAllLink from '../styles/CoverAllLink'
import EntityContainer from '../styles/EntityContainer'
import Link from '../styles/Link'
import {AvatarSmall} from '../styles/Avatar'
import MetaText from '../styles/MetaText'
import FollowButtonContainer from '../styles/FollowButtonContainer'
import {truncateText} from '../../utils/helpers'
import useWindowResize from '../../Hooks/useWindowSize'

const UserCard = ({userId, size, handleToProfile}) => {
    const {width} = useWindowResize()
    const authedUser = useSelector(getAuthedUserId())
    const user = useSelector(getUserById(userId))
    const dispatch = useDispatch()
    const history = useHistory()

    useSubscribeToUserUpdate(user)

    const handleFollowUnfollow = async () => {
        const data = {
            userId: userId,
            following: user.following,
            authedUser
        }
        await dispatch(toggleUserFollow(data)) 
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
                        <h3> 
                            {user.firstName.length + user.lastName.length + 1 > (width > 500 ? 26 : 22)
                            ?truncateText(`${user.firstName} ${user.lastName}`, (width > 500 ? 23 : 19))
                            :`${user.firstName} ${user.lastName}`
                            }
                        </h3>
                </Link>
                <MetaText>@{userId}</MetaText>
                <MetaText>
                        Following {user.followingsCount} | Followers {user.followersCount}
                </MetaText>
            </div>
            {userId !== authedUser && 
                <FollowButtonContainer>
                    {user.following
                        ?<MainButton onClick={handleFollowUnfollow} primary center small>Unfollow</MainButton>
                        :<MainButton onClick={handleFollowUnfollow} secondary center small>Follow</MainButton> }
                </FollowButtonContainer>
            }
        </EntityContainer>
    )
}
UserCard.propTypes = {
    userId: PropTypes.string.isRequired, 
    size: PropTypes.string, 
    handleToProfile: PropTypes.func
}

export default UserCard