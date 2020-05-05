import styled from 'styled-components';
import { constants } from './themes';

export const TweetText = styled.p`
    && {
        font-size: ${constants.mediumSmallFont};
        margin: 10px 10px 10px 0;
        line-height: 1.3em;
        white-space: pre-line;
    }
    @media only screen and (max-width: 600px) {
        && {
            font-size: 14px;
            margin: 10px 10px 10px 0;
            line-height: 1.3em;
            white-space: pre-line;
        }
    }
`
export default TweetText
  
