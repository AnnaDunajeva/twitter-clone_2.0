import styled from 'styled-components';

const ModalContainer = styled.div`
    position: fixed; 
    z-index: 2; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: ${props =>props.theme.backgroundBehindModal}; /* Black w/ opacity */

`
export default ModalContainer