import styled from 'styled-components';

export const MetaText = styled.p`
    && {
        color: ${props => props.theme.secondaryTextColor};
        font-size: ${props => props.theme.secondaryTextSize};
        margin: 4px 0;
    }
`
export default MetaText
  