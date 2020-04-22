import styled from 'styled-components';

const ImageGrid = styled.div`
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 12px;
    grid-row-gap: 12px;
    justify-items: center;
    justify-content: center;

`

export default ImageGrid
