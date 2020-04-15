import React, { useState } from 'react'
import {useHistory } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";


const SearchBar = () => {
    const [userTofind, setUserToFind] = useState('')
    const history = useHistory()

    const handleSearch = (e) => {
        e.preventDefault(); 
        const userId = userTofind
        setUserToFind('')
        history.push(`/find/${userId}`)
    }


    return (
        <form onSubmit={(e)=>handleSearch(e)}>
            <div className='search-input-container' tabIndex={0}>
                <IoIosSearch />
                <input
                    value={userTofind}
                    onChange={(e) => setUserToFind(e.target.value)}
                    type='text'
                    className='search-input'
            />
            </div>
        </form>
    )
}

export default SearchBar