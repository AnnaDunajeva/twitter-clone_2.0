import styled from 'styled-components';

//props:

const NewTweet = styled.form`
    width: 100%;
    max-width: ${props => props.theme.maxEntityWidth};
    padding: 5px;
    background-color: ${props => props.theme.invertedMainColor};
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.theme.entityBorder};
    border-radius: 5px;
    box-shadow: ${props => props.theme.entityShadow};
    
    &:hover,
    &:focus-within {
        border: 1px solid ${props => props.theme.entityHoverBorder};
        box-shadow: 0 0 0 0.05rem ${props => props.theme.entityHoverBorder}, ${props => props.theme.entityShadow};
    }

    textarea {
        resize: none;
        padding: 10px;
        font-size: 16px;
        outline: none;
        background-color: ${props => props.theme.invertedMainColor};
        border: none;
        margin: 2px;
        color: ${props => props.theme.mainColor}
    }
    textarea::placeholder {
        color: ${props => props.theme.secondaryTextColor};
    }
    >div:first-of-type {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p:first-of-type {
            margin-right: 7px;
        }
    }

`
export const ReplyContainer = styled.div`
    margin: 15px 0;
    >h3 {
        margin: 10px 0;
        font-size: 140%;
    }
    >form {
        margin: 25px auto;
    }
    @media only screen and (max-width: 500px) {
        >form {
            margin: 8px auto;
        }
    }
`

export default NewTweet

