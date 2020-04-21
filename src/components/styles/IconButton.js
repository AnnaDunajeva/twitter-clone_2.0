import styled from 'styled-components';
import {constants} from './themes'
import ClearButton from './ClearButton'

//pros: 
// pale, bright, liked, default bright
// float: right etc..., default null

const IconButton = styled(ClearButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => 
        (props.pale && props.theme.paleIcon) || 
        (props.liked && constants.red) ||
        props.theme.mainColor};
    ${props => props.float && `float: ${props.float};`}

    svg {
        fill: ${props => 
            (props.pale && props.theme.paleIcon) || 
            (props.liked && constants.red) ||
            props.theme.mainColor};
    }

    &:focus,
    &:hover {
        svg {
            fill: ${props => props.theme.hoverLinkColor};
        }
    }

`
IconButton.defaultProps = {
    padding: 0
}

export default IconButton