import React, {useEffect} from 'react'
import UserCard from '../entities/UserCard'
import ScrollUtil from '../utils/ScrollUtil'


const UsersList = ({
    stateSelector, 
    getDataFetch, 
    stateKey, 
    dispatchData, 
    handleToProfile, 
    headerText, 
    noDataText, 
    scrollableTarget, 
    showFollowButton
}) => {    
    useEffect(() => {
        console.log('rendering UserList')
    }, [])
    return (
        <ScrollUtil getDataFetch={getDataFetch} 
                    dispatchData={dispatchData} 
                    stateSelector={stateSelector}
                    take={15} 
                    scrollableTarget={scrollableTarget}
                    noDataText={noDataText || null}
                    stateKey={stateKey}
                    headerText={headerText || null}
                    reset={true}
                    >
            {(ids)=>(
                ids.map((id) => (
                    <UserCard 
                        userId={id} 
                        key={id}
                        handleToProfile={handleToProfile} 
                        size={'500px'} 
                        showFollowButton={showFollowButton}/>
                ))
            )}
        </ScrollUtil>
    )
}

export default UsersList

