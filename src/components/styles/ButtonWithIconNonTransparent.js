import styled from 'styled-components';
import MainButton from './MainButton'


const ButtonWithIconNonTransparent = styled(MainButton)`
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        fill: ${props => 
        (props.primary && props.theme.invertedMainColor) || 
        (props.secondary && props.theme.mainColor) || 
        (props.blue && 'white') ||
        props.theme.mainColor};
    }

`
ButtonWithIconNonTransparent.defaultProps = {
    padding: 0
}

export default ButtonWithIconNonTransparent