import React, {useCallback} from 'react'
import {getUsersSearchResultsIds} from '../../redux-store-2.0/composite-data/selectors'
import {findUserPaginated} from '../../redux-store-2.0/api/users'
import {searchUserKey} from '../../redux-store-2.0/utils/compositeDataStateKeys'
import UserCard from '../entities/UserCard'
import ScrollUtil from '../utils/ScrollUtil'
import EntityBackgroundContainer from '../styles/EntityBackgroundContainer'

const SearchResults = ({match}) => {
    const take = 7
    const userToFind = match.params.userId
    const usersSelector = useCallback(getUsersSearchResultsIds(userToFind), [])

    const dispatchData = {
        userId: userToFind
    }

    return (
        <EntityBackgroundContainer>
            <ScrollUtil 
                getDataFetch={findUserPaginated} 
                dispatchData={dispatchData} 
                stateSelector={usersSelector} 
                take={take} 
                headerText={`Search results for "${userToFind}"`} 
                noDataHeader={'Sorry :('}
                noDataText={`We could not find any users with name or username "${userToFind}".`}
                stateKey={searchUserKey(userToFind)}
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

export default SearchResults
