import styled from 'styled-components';

const ImageGrid = styled.div`
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 12px;
    grid-row-gap: 12px;
    justify-items: center;
    justify-content: center;
    > div {
        position: relative;
        display: flex;
        justify-items: center;
        justify-content: center;
    }
    @media only screen and (max-width: 600px) {
        grid-column-gap: 3px;
        grid-row-gap: 3px;
    }
`

export default ImageGrid
