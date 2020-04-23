import styled from 'styled-components';

//props:

const ProfileMetaData = styled.div`
    * {
        font-size: 16px;
    }

    > span,
    > div:first-of-type {
        margin: 7px 20px;
    }

    > div:first-of-type {
        height: 50px;
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
`

export default ProfileMetaData

