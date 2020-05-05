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
        height: 150px;
        width: 150px;
        border-radius: 75px;
        border: 7px solid ${props => props.theme.invertedMainColor};
        font-size: 11px;
        background: white;
    }
    /* avatar */
    img:last-of-type {
        position: absolute;
        top: 119px;
        left: 20px;
        height: 150px;
        width: 150px;
        border-radius: 75px;
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

    @media only screen and (max-width: 600px) {
        height: 120px;
        margin-bottom: 4px;

        img:first-of-type {
            height: 120px;
        }
        > div {
            top: 70px;
            height: 100px;
            width: 100px;
            border: 7px solid ${props => props.theme.invertedMainColor};
            font-size: 5px;
            background: white;
        }
        img:last-of-type {
            top: 70px;
            height: 100px;
            width: 100px;
            border: 4px solid ${props => props.theme.invertedMainColor};
            font-size: 5px;
        }
        > h3 {
            left: 130px;
            font-size: 25px;
        }
        > button {
            max-width: 100px;
        }
    }
`

export default ProfileBackgroundAndAvatar
