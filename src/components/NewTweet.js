import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Emoji from './Emoji'
import {MdSentimentSatisfied} from "react-icons/md"
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"
import {postTweet} from '../redux-store-2.0/api/tweets'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'
import emoji from '../utils/emoji'

const NewTweet = ({replyingTo}) => {
    const [text, setText] = useState('')
    const [isEmojiVisible, setIsEmojiVisible] = useState(false)
    const [toHome, setToHome] = useState(false)
    const authedUser = useSelector(getAuthedUserId())
    const dispatch = useDispatch()

    const currentLength = text.length
    const maxlength = 280

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(postTweet({
            tweet: { 
            text, 
            replyingTo: !replyingTo ? null : replyingTo
            },
            user: {
                userId: authedUser,
                token: localStorage.getItem('token')
            }
        }))
        //need to add handler for case when tweet did not get added due to some error
        setText('')
        setToHome(replyingTo ? false : true)
        // replyingTo && window.location.reload()
    }
    const addEmoji = (emoji) => {
        setText(state => state + emoji)
    }
    if (toHome === true) {
        return <Redirect to='/' />
      }

    return (
        <React.Fragment>
            <h1 className='header'>{replyingTo ? 'Leave your reply' : 'Compose new tweet'}</h1>
            <form className='new-tweet' onSubmit={handleSubmit}>
                <textarea
                    className='textarea'
                    maxLength={maxlength}
                    placeholder={replyingTo ? 'What are your thoughts?' : "What's on your mind?"}
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                >
                </textarea>
                <div className='flex-space-between'>
                    <div className='clickable hover-blue icon'>
                        <MdSentimentSatisfied size={30} onClick={()=>setIsEmojiVisible(state=>!state)}/>
                        {isEmojiVisible
                            ? <IoIosArrowUp size={30} onClick={()=>setIsEmojiVisible(state=>!state)}/>
                            : <IoIosArrowDown size={30} onClick={()=>setIsEmojiVisible(state=>!state)}/>
                        }
                    </div>
                    <div className='meta-text align-right '>{maxlength-currentLength} characters left</div>
                </div>
                {isEmojiVisible
                    ?
                    <div className='emoji-container'>
                        {emoji.map((emoji, index) => <Emoji key={index} symbol={emoji} addEmoji={addEmoji}/>)}
                    </div>
                    : null
                }
                <button
                    type='submit'
                    disabled={text === ''}
                    className='btn'
                >Post
                </button>
            </form>
        </React.Fragment>
    )
}

export default NewTweet