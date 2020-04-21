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
    padding: 5px;
    box-shadow: ${props => props.theme.navShadow};

    div {
        display: flex;
        align-items: center;
        font-size: ${constants.mediumFont};
    }
`

export default MainNav