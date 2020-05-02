import styled from 'styled-components';

const MainHeaderLogo = styled.div`
    position: absolute;
    left: 23%;
    top: 20%;
    padding: 20px 0 0 0;
    width: 320px;
    font-size: 90px;
    color: #FFD5FF;
    /* font-weight: 600; */
    letter-spacing: 6px;
    text-shadow: 1px 0px 4px #FFD5FF, 2px 0px 4px #FFD5FF, 3px 0px 4px #FFD5FF, 2px 0px 3px #D42CCA, 2px 3px 15px #D42CCA, 2px 0px 15px, 5px 0px 125px, 20px 0vw 200px #D42CCA,40px 0vw 200px #D42CCA;

    >div {
        display: block;
        transform: rotate(-9deg);
    }
    /* >div:first-of-type {
        span:nth-of-type(3) {
            animation: flicker 3s linear infinite;
        }
        span:nth-of-type(5) {
            animation: flicker .9s linear infinite;
        }
    } */
    >div:last-of-type {
        padding-left: 180px;
        span:nth-of-type(2) {
            animation: flicker 0.05s linear infinite;
        }
        span:last-of-type {
            animation: flicker 20s linear infinite;
        }
        animation: flicker 40s linear infinite;
    }

    span {
        color: white;
        /* font-family: 'Vibur', cursive; */
        /* font-family: 'Pacifico', cursive; */
        /* font-family: 'Grand Hotel', cursive; */
        font-family: 'Warnes', cursive;
        /* font-family: 'Comfortaa', cursive; */

    }

    @keyframes flicker {
        0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            opacity: .99;
            
        }
        20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
            opacity: 0.4;
        }
}
`

export default MainHeaderLogo