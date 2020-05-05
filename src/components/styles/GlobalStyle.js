import styled, { createGlobalStyle } from 'styled-components';
import {constants} from './themes'

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Lato', sans-serif;
        color: ${props => props.theme.mainColor};
        scrollbar-color: ${props => props.theme.paleIcon} ${props => props.theme.profileNavBackground};
    }
    ::-webkit-scrollbar {
        width: 14px;
        height: 10px;
    }
    ::-webkit-scrollbar-button {
        width: 0px;
        height: 0px;
    }
    ::-webkit-scrollbar-thumb {
        background: ${props => props.theme.paleIcon};
        border: 0px solid transparent;
        border-radius: 0px;
    }
    ::-webkit-scrollbar-thumb:hover,
    ::-webkit-scrollbar-thumb:active {
        background:${props => props.theme.secondaryTextColor};
    }

    ::-webkit-scrollbar-track {
        background: ${props => props.theme.profileNavBackground};
        border: 0px none transparent;
        border-radius: 0px;
    }
    ::-webkit-scrollbar-corner {
        background: transparent;
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
    h1 {
        font-size: ${constants.largeFont};
        text-align: center;
        margin: 15px;
    }
    h3 {
        text-align: center;
        font-size: ${constants.mediumLargeFont};
    }
    @media only screen and (max-width: 600px) {
        ::-webkit-scrollbar {
            width: 6px;
            height: 10px;
        }
    }
`

export default GlobalStyle
