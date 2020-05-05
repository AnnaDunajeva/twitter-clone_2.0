import styled from 'styled-components';

export const AvatarSmall = styled.img.attrs({tabIndex: 0})`
    position: relative;
    height: 65px;
    width: 65px;
    /* max-height: 65px;
    max-width: 65px; */
    border-radius: 40px;
    margin: 15px;
    font-size: 9px;
    border: 1px solid ${props => props.theme.entityBorder};

    &:hover {
        cursor: pointer;    
        box-shadow: 0 0 0 0.15rem ${props => props.theme.invertedMainColor}, 0 0 0 0.25rem ${props => props.theme.hoverLinkColor};
    }
    &:focus-within {
        cursor: pointer;    
        outline: none;
        box-shadow: 0 0 0 0.15rem ${props => props.theme.invertedMainColor}, 0 0 0 0.25rem ${props => props.theme.hoverLinkColor};
    }
    
    @media only screen and (max-width: 600px) {
        height: 45px;
        width: 45px;
        margin: 10px;
    }
`
export const AvatarBig = styled.div`
`