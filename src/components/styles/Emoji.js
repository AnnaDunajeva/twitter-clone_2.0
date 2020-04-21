import styled from 'styled-components';

const Emoji = styled.div`
    height: 138px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin: 7px 0 0 0;

    >span {
        font-size: 25px
    }
    >span:hover {
        cursor: pointer;
    }
`
export default Emoji