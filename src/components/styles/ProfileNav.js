import styled from 'styled-components';

//pros: 

const MainNav = styled.nav`
    display: flex;
    justify-content: center;
    background: ${props => props.theme.profileNavBackground};
    border: 1px solid ${props => props.theme.entityBorder};

`

export default MainNav
