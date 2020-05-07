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

    @media only screen and (max-width: 500px) {
        a {
            margin: 8px;
            padding: 5px 10px;
            font-size: 16px;
        }
    }
`

export default ProfileNav
