import styled from 'styled-components';

//pros: 

const SearchBar = styled.form.attrs({tabIndex: 0})`
    padding: 5px 10px;
    border-radius: 40px;
    background-color: ${props => props.theme.invertedMainColor};
    border: 1px solid ${props => props.theme.mainColor};
    margin-right: 10px;

    &:hover {
        /* box-shadow: 0 0 0 0.15rem ${props => props.theme.invertedMainColor}, 0 0 0 0.25rem ${props => props.theme.hoverLinkColor}; */
        box-shadow: 0 0 0 0.07rem ${props => props.theme.hoverLinkColor};
        border: 1px solid ${props => props.theme.hoverLinkColor};
        svg {
            fill: ${props => props.theme.hoverLinkColor}
        }
    }
    &:focus-within {
        outline: none;
        box-shadow: 0 0 0 0.07rem ${props => props.theme.hoverLinkColor};
        border: 1px solid ${props => props.theme.hoverLinkColor};
        /* box-shadow: 0 0 0 0.15rem ${props => props.theme.invertedMainColor}, 0 0 0 0.25rem ${props => props.theme.hoverLinkColor}; */
        border: 1px solid ${props => props.theme.hoverLinkColor};
        svg {
            fill: ${props => props.theme.hoverLinkColor}
        }
    }
    input {
        background-color: ${props => props.theme.invertedMainColor};
        border: none;
        font-size: 15px;
        font-weight: 500;
        padding-left: 5px;
    }
    input:focus {
        outline: none;
    }
    
`

export default SearchBar