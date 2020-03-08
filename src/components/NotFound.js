import React from 'react'
import LoginBar from './LoginBar'

const NotFound = () => {
    return (
        <React.Fragment>
            {localStorage.getItem('userId')
                ? null
                : <LoginBar/>
            }
            <div className='header'>Sorry, that page doesn’t exist!</div>
        </React.Fragment>
    )
}

export default NotFound