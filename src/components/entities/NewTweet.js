import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import Emoji from '../utils/Emoji'
import {MdSentimentSatisfied} from "react-icons/md"
import {postTweet} from '../../redux-store-2.0/api/tweets'
import emoji from '../../utils/emoji'
import TextareaAutosize from 'react-textarea-autosize';
import {FaRegImage} from 'react-icons/fa'
import DragAndDrop from '../utils/DragAndDrop'
import IconButton from '../styles/IconButton'
import MainButton from '../styles/MainButton'
import NewTweetForm from '../styles/NewTweet'
import EmojiStyled from '../styles/Emoji'
import MetaText from '../styles/MetaText'

const dragConfig = {
    height: 300,
    width: 300,
    aspect: 1,
    previewHeight: 100,
    previewWidth: 100
}
 
//should probably use useReducer here

const NewTweet = ({replyingTo, showHeader}) => {
    const dispatch = useDispatch()

    const [text, setText] = useState('')
    const [isEmojiVisible, setIsEmojiVisible] = useState(false)
    const [isImageVisible, setIsImageVisible] = useState(false)
    const [toHome, setToHome] = useState(false)
    const [file, setFile] = useState(null)
    const [crop, setCrop] = useState(null)
    const [cropResult, setCropResult] = useState(null) 

    const currentLength = text.length
    const maxlength = 280
    // const isShowHeader = showHeader === false ? false : true //in case its is undefined

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            tweet: { 
                text: text.trim(), 
                replyingTo
                }
        }
        if (file) {
            data.file = file
            data.tweet.crop = crop
        }
        console.log(data)
        await dispatch(postTweet(data))
        //need to add handler for case when tweet did not get added due to some error
        setText('')
        setFile(null)
        setCrop(null)
        setCropResult(null)
        setIsImageVisible(false)
        setIsEmojiVisible(false)
        setToHome(replyingTo ? false : true)
        // replyingTo && window.location.reload()
    }
    const addEmoji = (emoji) => {
        setText(state => state + emoji)
    }

    const handleRemoveImage = (e) => {
        e.preventDefault() 
        setFile(null)
        setCropResult(null)
    }
    const handleAcceptImage = (cropper) => {
        const crop = cropper.getData()
        setCrop(crop)
        setCropResult(cropper.getCroppedCanvas().toDataURL())
    }

    const handleToggleImage = (e) => {
        e.preventDefault()
        if (cropResult || !file) {
            setIsEmojiVisible(false)
            setIsImageVisible(state=>!state); 
        }
    }
    const handleToggleEmoji = (e) => {
        e.preventDefault()
        if (!(file && !cropResult)) {
            setIsImageVisible(false); 
            setIsEmojiVisible(state=>!state)
        }
    }

    return (
        <React.Fragment>
            {toHome && <Redirect to='/' />}
            {showHeader && 
                <h1>
                    {replyingTo 
                        ? 'Leave your reply' 
                        : 'Compose new tweet'}
                </h1>}
            <NewTweetForm onSubmit={handleSubmit}>
                <TextareaAutosize 
                    maxLength={maxlength}
                    placeholder={replyingTo ? 'What are your thoughts?' : "What's on your mind?"}
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    minRows={1}
                    maxRows={10}
                />
                <div>
                    <div style={{display: 'flex'}}>
                        <IconButton 
                            onClick={(e) => handleToggleEmoji(e)}
                            circle size={'40px'} margin={'0 5px 0 0'}>
                            <MdSentimentSatisfied size={27}/>
                        </IconButton>
                        <IconButton 
                            onClick={(e) =>handleToggleImage(e)}
                            circle size={'40px'} >
                                <FaRegImage size={25}/>
                        </IconButton>
                    </div>
                    <MetaText>{maxlength-currentLength} characters left</MetaText>
                </div>
                {isEmojiVisible && !isImageVisible &&
                    <EmojiStyled>
                        {emoji.map((emoji, index) => <Emoji key={index} symbol={emoji} addEmoji={addEmoji}/>)}
                    </EmojiStyled>
                }
                {isImageVisible 
                    ?<DragAndDrop 
                        file={file} 
                        setFile={setFile} 
                        setCrop={setCrop} 
                        config={dragConfig} 
                        cropResult={cropResult}
                        handleAcceptImage={handleAcceptImage} 
                        handleRemoveImage={handleRemoveImage}
                    />
                    :null
                }
            </NewTweetForm>
            {(text !== '' || (file !== null && crop !== null)) &&
                <MainButton
                    onClick={handleSubmit}
                    disabled={!(text !== '' || (file !== null && crop !== null))}
                    blue mediumSmall uppercase margin={'10px auto 0 auto'}>
                        Post
                </MainButton>
            }
        </React.Fragment>
    )
}
NewTweet.propTypes = {
    replyingTo: PropTypes.string, 
    showHeader: PropTypes.bool
}
NewTweet.defaultProps = {
    showHeader: true,
    replyingTo: null
}

export default NewTweet