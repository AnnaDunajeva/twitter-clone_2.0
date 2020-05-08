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
    @media only screen and (max-width: 500px) {
        >div:first-of-type {
            min-width: 200px;
            padding: 10px 16px;
        }
        button {
            width: 10vw;
            height: 10vw;
        }
    }

`
export const ColorPickerTool = styled.div`
    position: absolute;
    top: -520%;
    left: 90%;
    z-index: 3;

    @media only screen and (max-width: 500px) {
        width: 65vw !important;
        top: -650%;
        left: 5vw;
    }
`
