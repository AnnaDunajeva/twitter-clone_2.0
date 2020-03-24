import React, {useCallback} from 'react'
import UserCard from './UserCard'
import ScrollUtil from './ScrollUtil'
import {getDiscoverUsersIds} from '../redux-store-2.0/composite-data/selectors'
import {getAllUsersPaginated} from '../redux-store-2.0/api/users'
import {discoverUsersKey} from '../redux-store-2.0/utils/compositeDataStateKeys'
import useAuthedUserCredentials from '../Hooks/useAuthedUserCredentials'

const UsersList = () => {
    const userCredentials = useAuthedUserCredentials()
    const take = 7
    
    const usersSelector = useCallback(getDiscoverUsersIds(), [])

    return (
        <div className='big-container'>
        <ScrollUtil 
            getDataFetch={getAllUsersPaginated} 
            dispatchData={userCredentials} 
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
        </div>
    )
}

export default UsersList
