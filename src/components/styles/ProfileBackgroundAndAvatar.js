import styled from 'styled-components';

//props:

const ProfileBackgroundAndAvatar = styled.div`
    height: 194px;
    border-radius: 2px;
    margin: 0 auto;
    margin-bottom: 7px;
    position: relative;
    background: #97bad1;
    width: 100%;
    max-width: 970px;
    
    /* backgorund, rendered conditionally */
    img:first-of-type {
        width: 100%;
        max-width: 970px;
        height: 194px;
        object-fit: cover;
    }

    /* under avatar */
    > div {
        position: absolute;
        top: 119px;
        left: 20px;
        min-height: 150px;
        min-width: 150px;
        max-height: 150px;
        max-width: 150px;
        border-radius: 75px;
        font-size: 75px;
        border: 7px solid ${props => props.theme.invertedMainColor};
        font-size: 11px;
        background: white;
    }
    /* avatar */
    img:last-of-type {
        position: absolute;
        top: 119px;
        left: 20px;
        min-height: 150px;
        min-width: 150px;
        max-height: 150px;
        max-width: 150px;
        border-radius: 75px;
        font-size: 75px;
        border: 7px solid ${props => props.theme.invertedMainColor};
        font-size: 11px;
        box-shadow: ${props => props.theme.entityShadow}
        /* box-shadow: 0px 8px 15px -1px rgba(83, 84, 85, 0.322); */
    }

    > h3 {
        position: absolute;
        top: 70%;
        left: 182px;
        font-size: 35px;
        font-weight: 600;
        color: white;
        text-shadow: 0px 0px 4px rgba(167, 163, 163, 0.555);
    }
`

export default ProfileBackgroundAndAvatar
