import styled from 'styled-components';
import { constants } from './themes';

export const TweetText = styled.p`
    && {
        font-size: 100%;
        margin: 10px 10px 10px 0;
        line-height: 1.3em;
        white-space: pre-line;
    }
    @media only screen and (max-width: 500px) {
        && {
            font-size: 3.7vw;
            line-height: 1.5em;
        }
    }
`
export default TweetText
  
