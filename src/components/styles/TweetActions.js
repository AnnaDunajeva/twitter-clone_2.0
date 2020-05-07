import styled from 'styled-components';

export const TweetActionsContainer = styled.div`
    display: flex;
    align-items: center;
    @media only screen and (max-width: 500px) {
        > button {
            font-size: 3.3vw;
        }
        
        svg {
            height: 6vw;
            width: 6vw;
        }
    }
`
export const TweetActionsContainerSecondary = styled(TweetActionsContainer)`
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${props => props.theme.tweetResponseOnContentBackground};
    padding: 5px;
    margin-top: 5px;
    justify-content: flex-end;

`
