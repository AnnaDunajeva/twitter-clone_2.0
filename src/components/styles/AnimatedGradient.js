import styled from 'styled-components';

const AnimatedGradient = styled.div`

width: 100%;
    height: 100vh;
    color: white;
    background: linear-gradient(135deg, rgba(114,191,204,1) 0%, rgba(110,149,194,1) 29%, rgba(127,121,189,1) 50%, rgba(157,111,181,1) 70%, rgba(199,134,166,1) 88%, rgba(235,150,150,1) 100%);
    background-size: 300% 300%;
    animation: Gradient 36s ease infinite;

    @keyframes Gradient {
        0% {
            background-position: 0% 50%
        }
        50% {
            background-position: 100% 50%
        }
        100% {
            background-position: 0% 50%
        }
    }

`
export default AnimatedGradient
