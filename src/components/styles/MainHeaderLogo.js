import styled from 'styled-components';

const MainHeaderLogo = styled.div`
    position: fixed;
    left: 27%;
    top: 9%;
    padding: 20px 0 0 0;
    width: 320px;
    font-size: 3vw;
    color: #FFD5FF;
    letter-spacing: 6px;
    line-height: 5vw;
    text-shadow:0 0 5px #fff, 0 0 8px #fff, 0 0 10px #fff, 0 0 15px #ff90a2, 0 0 20px #ff516e, 0 0 30px #ff4262, 0 0 40px #ff3175, 0 0 50px #ff1160, 0 0 70px #ff1160, 0 0 80px #FF1177, 0 0 100px #ff1158, 0 0 150px #ff1160;

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

    @media only screen and (max-width: 1000px) {
        left: 5%;
        top: 18%;
        font-size: 5vw;
        line-height: 4.5rem;
            >div:last-of-type {
                padding-left:20%;
            }
    }
    @media only screen and (max-width: 600px) {
        left: 5%;
        top: 17%;
        font-size: 6vw;
        line-height: 3rem;
            >div:last-of-type {
                padding-left: 0;
            }
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