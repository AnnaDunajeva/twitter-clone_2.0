import React, { useState } from 'react'
import {useHistory } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import {removeBlacklistChars} from '../../utils/helpers'
import SearchBarForm from '../styles/SearchBar'

const SearchBar = () => {
    const [userTofind, setUserToFind] = useState('')
    const history = useHistory()

    const handleSearch = (e) => {
        e.preventDefault(); 
        const userId = removeBlacklistChars(userTofind) 
        setUserToFind('')
        history.push(`/find/${userId}`)
    }

    return (
        <SearchBarForm onSubmit={(e)=>handleSearch(e)}>
            <div>
                <IoIosSearch />
                <input
                    value={userTofind}
                    maxLength={50}
                    onChange={(e) => setUserToFind(e.target.value)}
                    type='text'/>
            </div>
        </SearchBarForm>
    )
}

export default SearchBar