import styled from 'styled-components';

const ModalContainer = styled.div`
    position: fixed; 
    z-index: 800; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: ${props =>props.background || props.theme.backgroundBehindModal}; /* Black w/ opacity */

    /* &.item-appear {
        opacity: 0;
    }
    &.item-appear-active {
        opacity: 1;
        transition: opacity 100ms;
    }
    &.item-enter {
        opacity: 0;
    }
    &.item-enter-active {
        opacity: 1;
        transition: opacity 100ms;
    }
    &.item-exit {
        opacity: 1;
    }
    &.item-exit-active {
        opacity: 0;
        transition: opacity 100ms;
    } */
`
export default ModalContainer