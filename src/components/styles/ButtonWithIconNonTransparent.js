import styled from 'styled-components';
import MainButton from './MainButton'


const ButtonWithIconNonTransparent = styled(MainButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.mainColor};

    svg {
        fill: ${props => props.theme.mainColor};
    }

`
ButtonWithIconNonTransparent.defaultProps = {
    padding: 0
}

export default ButtonWithIconNonTransparent