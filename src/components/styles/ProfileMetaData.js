import styled from 'styled-components';

//props:

const ProfileMetaData = styled.div`
    * {
        font-size: 16px;
    }

    > span,
    > div:first-of-type {
        margin: 7px 20px;
        word-wrap: break-word;
    }

    > div:first-of-type {
        height: 55px;
        padding-left: 140px;
        margin-top: 0;
    }
    >div:last-of-type {
        margin-top: 5px;
        display: flex;

        >button {
            margin: 0 11px;
            padding: 7px 11px;
        }
    }
    
    svg {
        vertical-align: bottom;
        margin-right: 5px;
    }
    @media only screen and (max-width: 500px) {
        * {
            font-size: 3vw;
        }
        >span {
            display: block;
            margin-left: 21px;
        }

        > div:first-of-type {
            height: 40px;
            padding-left: 90px;
            margin-top: 0;            
        }
        >div:last-of-type {
            margin-top: 5px;
            display: flex;

            >button {
                margin: 0 11px;
                padding: 7px 11px;
            }
        }
        svg {
            vertical-align: bottom;
            margin-right: 5px;
            width: 15px;
            height: 15px;
        }

    }
`

export default ProfileMetaData

