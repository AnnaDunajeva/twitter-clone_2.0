
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

`
export default SignInPageContainer
