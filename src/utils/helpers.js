import moment from 'moment'


export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-GB')
    return time.slice(0, 5) + ' | ' + d.toLocaleDateString('en-GB')
}

export const formatJoinDate = (timestamp) => {
  return moment(timestamp).format('MMMM YYYY')
}

export function formatTweet (tweet, author, authedUser, parentTweet) {
  const { id, likes, replies, text, timestamp } = tweet
  const { name, avatarURL, userId } = author

  return {
    name,
    userId,
    id,
    timestamp: parseInt(timestamp),
    text,
    avatar: avatarURL,
    likes: likes.length,
    replies: replies.length,
    hasLiked: likes.includes(authedUser),
    parent: !parentTweet ? null : {
      author: parentTweet.author,
      id: parentTweet.id,
    }
  }
}

//! # $ % & ‘ * + – / = ? ^ ` . { | } ~ characters are legal in the local part of an e-mail 
//address but in this regular expression those characters are filtered out. 
export const validateEmail = (email) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/.test(email)) {
    return (true)
  }
  return (false)
}

export const getUserIdFromCookie = () => document.cookie.replace(/(?:(?:^|.*;\s*)id\s*=\s*([^;]*).*$)|^.*$/, "$1")

export const isStateKeyInErrors = (stateKey, stringArray) => {
  return stringArray.filter(error => error.includes(stateKey)) ? true : false 
}

export const removeBlacklistChars = (input) => {
  return input
      .trim()
      .replace(/[^\w\s\-]/g, "")
}

export const isValidUsername = (username) => {
  return /^[0-9a-zA-Z_-üõöä]+$/.test(username.trim())
}

export const isValidFisrtOrLastname = (name) => {
  return /^[a-zA-Z- üõöä]+$/.test(name.trim())
}

export const isValidLocation = (location) => {
  return /^[a-zA-Z- ,üõöä]+$/.test(location.trim())
}

export const truncateText = (text, lenght) => {
  return text.slice(0, lenght) + '...'
}

export const getOauthUserData = () => {
  const cookieData = document.cookie.replace(/(?:(?:^|.*;\s*)oauth_user_data\s*=\s*([^;]*).*$)|^.*$/, "$1") 
  const outhData = cookieData !== '' ? JSON.parse(cookieData) : null
  const decodedOauthData = outhData !== null 
    ?{  
      firstName: decodeURI(outhData.firstName),
      lastName: decodeURI(outhData.lastName)
    }
    : null
  return decodedOauthData
}
