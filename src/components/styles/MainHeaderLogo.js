import styled from 'styled-components';

const MainHeaderLogo = styled.div`
    position: fixed;
    left: 26%;
    top: 9%;
    padding: 20px 0 0 0;
    width: 320px;
    font-size: 55px;
    color: #FFD5FF;
    /* font-weight: 600; */
    letter-spacing: 6px;
    line-height: 4.5rem;
    /* text-shadow: 0px 0px 4px #FFD5FF, 0px 0px 4px #FFD5FF, 0px 0px 4px #FFD5FF, 0px 0px 3px #D42CCA, 0px 3px 15px #D42CCA, 0px 0px 15px, 0px 0px 125px, 0px 0vw 200px #D42CCA,0px 0vw 200px #D42CCA; */
    text-shadow:0 0 5px #fff, 0 0 8px #fff, 0 0 10px #fff, 0 0 15px #ff90a2, 0 0 20px #ff516e, 0 0 30px #ff4262, 0 0 40px #ff3175, 0 0 50px #ff1160, 0 0 70px #ff1160, 0 0 80px #FF1177, 0 0 100px #ff1158, 0 0 150px #ff1160;
    /* >div {
        display: block;
        transform: rotate(-9deg);
    } */
    >div:first-of-type {
        span:nth-of-type(5) {
            animation: flicker 10s linear infinite;
        }
    }
    >div:last-of-type {
        padding-left: 20%;
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
        /* font-family: 'Warnes', cursive; */
        /* font-family: 'Comfortaa', cursive; */
        font-family: 'Monoton', cursive;

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