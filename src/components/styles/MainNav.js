import styled from 'styled-components';
import {constants} from './themes'

//pros: 

const MainNav = styled.nav`
    position: sticky;
    background-color: ${props => props.theme.invertedMainColor};
    margin: 4px 0 25px 0;
    display: flex;
    justify-content: space-between;
    top: 0;
    z-index: 1;
    padding: 5px 0px;
    box-shadow: ${props => props.theme.navShadow};
    >div:nth-of-type(2) {
        flex: 2;
    }

    div {
        display: flex;
        align-items: center;
        font-size: ${constants.mediumFont};
    }
    @media only screen and (max-width: 500px) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom:10px;
        padding: 5px;
        >div {
            margin-bottom: 5px;
        }
        a {
            padding: 5px 6px;
            font-size: 4vw;
            margin-right: 5px;
            max-width: 20vw;
        }
        a:first-of-type {
            width: 60px;
        }
        >div:nth-of-type(3){
            order: 2;
        }
        >div:nth-of-type(2){
            order: 3;
        }
        svg {
            width: 20px;
            height: 20px;
        }
        button {
            padding: 5px;
            margin: 0;
            font-size: 4vw;
        }
        button:first-of-type {
            width: 30px;
            height: 30px;
            margin-right: 4px;
        }

    }
`

export default MainNav