import styled from 'styled-components';

const TweetImage = styled.img.attrs({alt: ''})`
    width: 400px;
    height: 400px;
    border-radius: 2px;

    @media only screen and (max-width: 600px) {
        width: 65vw;
        height: 65vw;

    }
`
export default TweetImage