import styled from 'styled-components';

const Link = styled.span.attrs({tabIndex: 0})`
    position: relative;
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    &, * {
        font-size: ${props => (props.secondary && props.theme.secondaryTextSize) || 'inherit'};
        color: ${props => 
        (props.secondary && props.theme.secondaryTextColor) || 
        props.theme.mainColor};
    }
    &:hover,
    &:focus {
        &, * {
            cursor: pointer;
            outline: none;
            color: ${props => props.theme.hoverLinkColor};
            text-decoration: underline;
        }
    }

`
Link.defaultProps = {
    padding: '0',
    margin: '0',
}

export default Link