import styled from 'styled-components';
import MainButton from './MainButton'
import {constants} from './themes'

//props:
//circle
//hoverOnDark, hoverOnLight, default onLight
//backgroundcolor transparent by default
//color is props.theme.mainColor by default 
//textLight

const ClearButton = styled(MainButton)`
    border: none;
    box-shadow: none;
    background-color: transparent;
    ${props => props.textLight && `color: white;`}

    &:hover, 
    &:focus {
        border: none;
        box-shadow: none;
        background-color: ${props => 
            (props.hoverOnDark && props.theme.hoverOnDarkBackground) ||
            (props.theme.hoverOnLightBackground)};
        outline: none;
        color: ${props => props.theme.hoverLinkColor};
        fill: ${props => props.theme.hoverLinkColor};
    }
    &.active {
        font-weight: ${constants.boldFont}
    }

`
// ClearButton.defaultProps = {
//     size: 'inherit',
//     margin: 0,
//     fontSize: 'mediumLargeFont',
//     padding: '10px 15px'
// }

export default ClearButton
