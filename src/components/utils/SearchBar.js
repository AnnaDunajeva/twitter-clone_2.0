import React, { useState } from 'react'
import {useHistory } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
// import {FaSearch} from 'react-icons/fa'
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
                {/* <FaSearch /> */}
                <input
                    value={userTofind}
                    onChange={(e) => setUserToFind(e.target.value)}
                    type='text'/>
            </div>
        </SearchBarForm>
    )
}

export default SearchBar