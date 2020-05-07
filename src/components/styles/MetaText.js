import styled from 'styled-components';

export const MetaText = styled.p`
    && {
        color: ${props => props.theme.secondaryTextColor};
        font-size: 80%;
        margin: 4px 0;
    }
    @media only screen and (max-width: 500px) {
        && {
            font-size: 3.2vw;
        }
    }
`
export default MetaText
  