import React, {useCallback} from 'react'
import ScrollUtil from '../utils/ScrollUtil'
import {getUserTweetImagesPaginated} from '../../redux-store-2.0/api/tweets'
import {getUserTweetsWithImagesIds} from '../../redux-store-2.0/composite-data/selectors'
import {userTweetImagesKey} from '../../redux-store-2.0/utils/compositeDataStateKeys'
import Image from '../entities/Image'
import ImageGrid from '../styles/ImageGrid'
import useCompositeDataUpdate from '../../Hooks/useCompositeDataUpdate'

const ImagesList = ({ 
    userId, 
    dispatchData, 
    handleToTweetPage,
    handleToProfile,
    interval
}) => {    
    const userImagesSelector = useCallback(getUserTweetsWithImagesIds(userId), []) 

    useCompositeDataUpdate({
        take: 15, 
        dispatchData: {
            ...dispatchData,
            update: true
        }, 
        getUpdateFunc: getUserTweetImagesPaginated, 
        stateKey: userTweetImagesKey(userId),
        interval})
    
    return (
        <ScrollUtil getDataFetch={getUserTweetImagesPaginated} 
                    dispatchData={dispatchData} 
                    stateSelector={userImagesSelector}
                    take={15} 
                    noDataText={'No images to show yet!'}
                    stateKey={userTweetImagesKey(userId)}
                    >
            {(ids)=>(
                <ImageGrid>
                    {ids.map((id) => (
                        <Image 
                            id={id} 
                            key={id} 
                            handleToProfile={handleToProfile}
                            handleToTweetPage={handleToTweetPage}/>
                    ))}
                </ImageGrid>  
            )}
        </ScrollUtil>
    )
}

export default ImagesList

