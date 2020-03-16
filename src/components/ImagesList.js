import React, {useCallback} from 'react'
import ScrollUtil from './ScrollUtil'
import {getUserTweetImagesPaginated} from '../redux-store-2.0/api/tweets'
import {getUserTweetsWithImagesIds} from '../redux-store-2.0/composite-data/selectors'
import {userTweetImagesKey} from '../redux-store-2.0/utils/compositeDataStateKeys'
import Image from './Image'

const ImagesList = ({ userId, dispatchData, setToTweetPageId}) => {    
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
                        <Image id={id} key={id} setToTweetPageId={setToTweetPageId}/>
                    ))}
                </div>  
            )}
        </ScrollUtil>
    )
}

export default ImagesList

