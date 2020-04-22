import styled from 'styled-components';

//pros: 

const ProfileNav = styled.nav`
    display: flex;
    justify-content: center;
    background: ${props => props.theme.profileNavBackground};
    border-top: 1px solid ${props => props.theme.entityBorder};
    border-bottom: 1px solid ${props => props.theme.entityBorder};
    border-left: 1px solid ${props => props.theme.entityContainerBorder};
    border-right: 1px solid ${props => props.theme.entityContainerBorder};


`

export default ProfileNav
