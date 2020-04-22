import styled, { createGlobalStyle } from 'styled-components';
import {constants} from './themes'

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
        color: ${props => props.theme.mainColor}
    }
    body {
        background-color: ${props => props.theme.invertedMainColor}
    }
    a {
        position: relative;
        text-decoration: none;
        color: ${props => props.theme.mainColor};
    }
    a:hover,
    a:focus  {
        cursor: pointer;
        outline: none;
        color: ${props => props.theme.hoverLinkColor};
        text-decoration: none;
    }
    li {
        list-style-type: none;
    }
`

export default GlobalStyle
