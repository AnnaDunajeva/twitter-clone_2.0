import React, {useCallback} from 'react'
import ScrollUtil from '../utils/ScrollUtil'
import {getUserTweetImagesPaginated} from '../../redux-store-2.0/api/tweets'
import {getUserTweetsWithImagesIds} from '../../redux-store-2.0/composite-data/selectors'
import {userTweetImagesKey} from '../../redux-store-2.0/utils/compositeDataStateKeys'
import Image from '../entities/Image'

const ImagesList = ({ 
    userId, 
    dispatchData, 
    handleToTweetPage,
    handleToProfile
}) => {    
    const userImagesSelector = useCallback(getUserTweetsWithImagesIds(userId), []) //not sure if I need it
    return (
        <ScrollUtil getDataFetch={getUserTweetImagesPaginated} 
                    dispatchData={dispatchData} 
                    stateSelector={userImagesSelector}
                    take={6} 
                    noDataText={'No images to show yet!'}
                    stateKey={userTweetImagesKey(userId)}
                    >
            {(ids)=>(
                <div className='image-grid'>
                    {ids.map((id) => (
                        <Image 
                            id={id} 
                            key={id} 
                            handleToProfile={handleToProfile}
                            handleToTweetPage={handleToTweetPage}/>
                    ))}
                </div>  
            )}
        </ScrollUtil>
    )
}

export default ImagesList

