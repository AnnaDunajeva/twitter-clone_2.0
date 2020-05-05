
import styled from 'styled-components';

const SignInNav = styled.div`
    background-color: ${props => props.theme.invertedMainColor};
    position: relative;

    @media only screen and (max-width: 600px) {
        >div:first-of-type {
            height: 100vh;
            >img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    @media only screen and (min-width: 600px) {
        >div:first-of-type {
            height: 100vh;
            min-height: 700px;

            >img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

`
export default SignInNav
