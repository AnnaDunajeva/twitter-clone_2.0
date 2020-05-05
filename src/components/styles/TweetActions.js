import styled from 'styled-components';

export const TweetActionsContainer = styled.div`
    display: flex;
    align-items: center;
    @media only screen and (max-width: 600px) {
        > button {
            font-size: 11px;
        }
        
        svg {
            height: 20px;
            width: 20px;
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
