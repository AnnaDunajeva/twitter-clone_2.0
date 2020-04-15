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
                    take={7} 
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
                        handleToProfile={handleToProfile} 
                        style={{width: '500px'}} 
                        showFollowButton={showFollowButton}/>
                ))
            )}
        </ScrollUtil>
    )
}

export default UsersList

