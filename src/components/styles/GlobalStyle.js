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
        text-decoration: none;
        color: #424242;
    }
    a:hover {
        color: ${props => props.theme.blue};
    }
    a:focus {
        color: ${props => props.theme.blue};
    }
    li {
        list-style-type: none;
    }
`

export default GlobalStyle
