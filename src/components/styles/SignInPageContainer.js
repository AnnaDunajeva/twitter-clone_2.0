
import styled from 'styled-components';

const SignInPageContainer = styled.div`
    background-color: ${props => props.theme.invertedMainColor};
    position: relative;
    
    >div:first-of-type {
        height: 100vh;
        >img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    @media only screen and (max-width: 500px) {
        button {
            font-size: 5vw;
        }
    }
    @media only screen and (min-width: 500px) {
        >div:first-of-type {
            min-height: 700px;
        }
    }

`
export default SignInPageContainer
