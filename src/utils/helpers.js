import moment from 'moment'

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