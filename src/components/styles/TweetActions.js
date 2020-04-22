import styled from 'styled-components';

export const TweetActionsContainer = styled.div`
    display: flex;
    align-items: center;
`
export const TweetActionsContainerSecondary = styled(TweetActionsContainer)`
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${props => props.theme.tweetResponseOnContentBackground};
    padding: 5px;
    justify-content: flex-end;
`
