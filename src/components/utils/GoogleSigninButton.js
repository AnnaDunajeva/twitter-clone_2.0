import React from 'react'
import ButtonWithIconNonTransparent from '../styles/ButtonWithIconNonTransparent'
import {FaGoogle} from 'react-icons/fa'
import {URL} from '../../redux-store-2.0/constants'

const GoogleSigninButton = () => {
    return (
        <ButtonWithIconNonTransparent 
            as='a'
            href={`${URL}/user/login/google`}
            blue margin={'10px auto 20px auto'} padding={'12px 15px'}>
                <FaGoogle />
                Sign in with Google
        </ButtonWithIconNonTransparent>
    )
}

export default GoogleSigninButton