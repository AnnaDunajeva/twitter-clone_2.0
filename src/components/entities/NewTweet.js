import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Emoji from '../utils/Emoji'
import {MdSentimentSatisfied} from "react-icons/md"
import {postTweet} from '../../redux-store-2.0/api/tweets'
import emoji from '../../utils/emoji'
import TextareaAutosize from 'react-textarea-autosize';
import {FiImage} from "react-icons/fi"
import DragAndDrop from '../utils/DragAndDrop'
// import useAuthedUserCredentials from '../Hooks/useAuthedUserCredentials'

const dragConfig = {
    height: 300,
    width: 300,
    aspect: 1,
    previewHeight: 100,
    previewWidth: 100
}

//should probably use useReducer here

const NewTweet = ({replyingTo, showHeader}) => {
    // const userCredentials = useAuthedUserCredentials()
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
    const isShowHeader = showHeader === false ? false : true //in case its is undefined

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            tweet: { 
                text, 
                replyingTo: !replyingTo ? null : replyingTo
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

    const handleToggleImage = () => {
        if (cropResult || !file) {
            setIsEmojiVisible(false)
            setIsImageVisible(state=>!state); 
        }
    }
    const handleToggleEmoji = () => {
        if (!(file && !cropResult)) {
            setIsImageVisible(false); 
            setIsEmojiVisible(state=>!state)
        }
    }

    return (
        <React.Fragment>
            {toHome && <Redirect to='/' />}
            {isShowHeader && 
                <h1 className='header'>
                    {replyingTo 
                        ? 'Leave your reply' 
                        : 'Compose new tweet'}
                </h1>}
            <form className='new-tweet' onSubmit={handleSubmit}>
                <TextareaAutosize 
                    className='textarea'
                    maxLength={maxlength}
                    placeholder={replyingTo ? 'What are your thoughts?' : "What's on your mind?"}
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    minRows={1}
                    maxRows={10}
                />
                <div className='flex-space-between new-tweet-meta'>
                    <div style={{display: 'flex'}}>
                        <div className='clickable hover-blue show-emoji-icon-container' tabIndex={0}>
                            <MdSentimentSatisfied size={27} onClick={handleToggleEmoji} />
                        </div>
                        <div className='clickable hover-blue show-emoji-icon-container' tabIndex={0}>
                            <FiImage size={27} onClick={handleToggleImage}/>
                        </div>
                    </div>
                    <div className='meta-text align-right '>{maxlength-currentLength} characters left</div>
                </div>
                {(isEmojiVisible && !isImageVisible)
                    ?<div className='emoji-container'>
                        {emoji.map((emoji, index) => <Emoji key={index} symbol={emoji} addEmoji={addEmoji}/>)}
                    </div>
                    : null
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
                {(text !== '' || (file !== null && crop !== null)) &&
                    <button
                        type='submit'
                        disabled={!(text !== '' || (file !== null && crop !== null))}
                        className='btn'
                    >Post
                    </button>
                }
            </form>
        </React.Fragment>
    )
}

export default NewTweet