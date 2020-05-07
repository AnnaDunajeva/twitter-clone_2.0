import styled from 'styled-components';

const TweetImage = styled.img.attrs({alt: ''})`
    width: 400px;
    height: 400px;
    border-radius: 2px;

    @media only screen and (max-width: 500px) {
        width: 70vw;
        height: 70vw;

    }
`
export default TweetImage