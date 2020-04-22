import styled from 'styled-components';

export const ColorPickerContainer = styled.div`
    position: relative;
    display: flex;

    >div:first-of-type {
        flex-grow: 2;
        width: initial;
        padding: 12px 25px;
        border-radius: 30px;
        border: 1px solid ${props => props.theme.entityBorder};
        background-color: ${props => props.theme.invertedMainColor};
        box-shadow: ${props => props.theme.inputShadow};
        min-width: 300px;
    }

`
export const ColorPickerTool = styled.div`
    position: absolute;
    top: -520%;
    left: 90%;
    z-index: 1;
`
