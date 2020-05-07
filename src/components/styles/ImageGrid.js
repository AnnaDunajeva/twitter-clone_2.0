import styled from 'styled-components';

const ImageGrid = styled.div`
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 12px;
    grid-row-gap: 12px;
    justify-items: center;
    justify-content: center;
    > .image-container {
        position: relative;
        display: flex;
        justify-items: center;
        justify-content: center;
    }
    @media only screen and (max-width: 500px) {
        grid-column-gap: 6px;
        grid-row-gap: 6px;
    }
`

export default ImageGrid
