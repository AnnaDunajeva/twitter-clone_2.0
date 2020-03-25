import moment from 'moment'
import {defaultBackgroundColor} from '../redux-store-2.0/constants'
import * as linkify from 'linkifyjs'

export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-GB')
    return time.slice(0, 5) + ' | ' + d.toLocaleDateString('en-GB')

    // const localeTime = moment(d).local().format('LT')
    // const localeDate = moment(d).local().format('L')
    // return `${localeTime} ${localeDate}`
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

export const splitText = (text) => {
  let formatedText = ''
  const maxLineLength = 60
  let currentLineLength = 0
  let lineStartIndex = 0
  let lineEndIndex = 0
  for (let i = 0; i < text.length; i++) {
    
  }
}

export const subscribeToTweetUpdate = (tweetIds, socket) => {
  tweetIds.forEach(tweetId => {
    console.log('about to subscribe to tweet update ', tweetId, )
    socket.emit('subscribe_to_tweet_update', tweetId) 
  })
}

// export const formatUser = (user) => {
//   return {
//     ...user,
//     backgroundColor: user.backgroundURL 
//       ?linkify.test(user.backgroundURL) 
//         ? defaultBackgroundColor 
//         : user.backgroundURL
//       :defaultBackgroundColor
//   }
// }