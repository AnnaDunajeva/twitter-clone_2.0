import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Emoji from './Emoji'
import {MdSentimentSatisfied} from "react-icons/md"
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"
import {postTweet} from '../redux-store-2.0/api/tweets'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import emoji from '../utils/emoji'
import TextareaAutosize from 'react-textarea-autosize';
import {FiImage} from "react-icons/fi"
import DragAndDrop from './DragAndDrop'

const dragConfig = {
    height: 300,
    width: 300,
    aspect: 1,
    previewHeight: 100,
    previewWidth: 100
}

const NewTweet = ({replyingTo, showHeader}) => {
    const isShowHeader = showHeader === false ? false : true
    const [text, setText] = useState('')
    const [isEmojiVisible, setIsEmojiVisible] = useState(false)
    const [isImageVisible, setIsImageVisible] = useState(false)
    const [toHome, setToHome] = useState(false)
    const authedUser = useSelector(getAuthedUserId())
    const dispatch = useDispatch()

    const [crop, setCrop] = useState(null)
    const [file, setFile] = useState(null)
    const [cropResult, setCropResult] = useState(null)

    const currentLength = text.length
    const maxlength = 280

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            tweet: { 
                text, 
                replyingTo: !replyingTo ? null : replyingTo
                },
            user: {
                userId: authedUser,
                token: localStorage.getItem('token')
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
    // if (toHome === true) {
    //     return <Redirect to='/' />
    // }
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
            {isShowHeader && <h1 className='header'>{replyingTo ? 'Leave your reply' : 'Compose new tweet'}</h1>}
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
                {/* <textarea
                    className='textarea'
                    maxLength={maxlength}
                    placeholder={replyingTo ? 'What are your thoughts?' : "What's on your mind?"}
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                >
                </textarea> */}
                <div className='flex-space-between new-tweet-meta'>
                    <div style={{display: 'flex'}}>
                        <div className='clickable hover-blue show-emoji-icon-container' tabIndex={0}>
                            <MdSentimentSatisfied size={27} onClick={handleToggleEmoji} />
                            {/* {isEmojiVisible
                                ? <IoIosArrowUp size={27} onClick={()=>setIsEmojiVisible(state=>!state)}/>
                                : <IoIosArrowDown size={27} onClick={()=>setIsEmojiVisible(state=>!state)}/>
                            } */}
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
                <button
                    type='submit'
                    disabled={!(text !== '' || (file !== null && crop !== null))}
                    className='btn'
                >Post
                </button>
            </form>
        </React.Fragment>
    )
}

export default NewTweet