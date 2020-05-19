
import styled from 'styled-components';

const SignInPageContainer = styled.div`
    background-color: ${props => props.theme.invertedMainColor};
    position: relative;
    
    >div:first-of-type {
        height: 100vh;
        min-height: 700px;
        >img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    /* @media only screen and (max-width: 500px) {
        button {
            font-size: 5vw;
        }
    } */

`
export default SignInPageContainer
