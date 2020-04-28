import React, {useCallback} from 'react'
import {getDiscoverUsersIds} from '../../redux-store-2.0/composite-data/selectors'
import {getAllUsersPaginated} from '../../redux-store-2.0/api/users'
import {discoverUsersKey} from '../../redux-store-2.0/utils/compositeDataStateKeys'
import UserCard from '../entities/UserCard'
import ScrollUtil from '../utils/ScrollUtil'
import EntityBackgroundContainer from '../styles/EntityBackgroundContainer'

const DiscoverUsers = () => {
    const take = 15
    const usersSelector = useCallback(getDiscoverUsersIds(), [])

    return (
        <EntityBackgroundContainer>
            <ScrollUtil 
                getDataFetch={getAllUsersPaginated} 
                dispatchData={{}} 
                stateSelector={usersSelector} 
                take={take} 
                headerText={'Find interesting people to follow!'} 
                noDataText={'No users joind yet!'}
                stateKey={discoverUsersKey()}
                >
                {(ids)=>(
                    <ul>
                        {ids.map((userId) => (
                            <li key={userId}>
                                <UserCard userId={userId}/>
                            </li>
                        ))}
                    </ul>
                )}
            </ScrollUtil>
        </EntityBackgroundContainer>
    )
}

export default DiscoverUsers
