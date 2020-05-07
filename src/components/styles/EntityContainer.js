import styled from 'styled-components';
import {constants} from './themes'

//pros: 
// size in pixels, default min 400 max 600

const EntityContainer = styled.div`
    will-change: opacity, box-shadow;
    position: relative;
    display: flex;
    max-width: ${props => props.theme.maxEntityWidth};
    min-width: 400px;
    ${props => props.size && `width: ${props.size};`}
    padding: 5px;
    margin: 25px auto;
    background-color: ${props => props.theme.invertedMainColor};
    color: ${props => props.theme.mainColor};
    border-radius: 5px;
    border: 1px solid ${props => props.theme.entityBorder};
    box-shadow: ${props => props.theme.entityShadow};

/* username */
    h3 {
        font-size: ${constants.mediumFont};
        font-weight: ${constants.boldFont};
        display: inline-block;
        text-align: start;
        /* max-width: 96%; */
    }
/* tweet meta container, first div is CoverAllLink */
    > div:nth-of-type(2) {
        max-width: 80%;
        margin: 15px 15px 15px 0;
        flex: 2;
        word-wrap: break-word;

        div:first-of-type {
            max-width: 95%;
        }
    }

    @media only screen and (max-width: 500px) {
        min-width: 80vw;
        max-width: 95vw;
        padding: 3px;
        margin: 8px auto;
        
        > div:nth-of-type(2) {
            margin: 10px 3px 10px 0;
            
            div:first-of-type {
                max-width: 89%;
            }
        }

        iframe {
            width: 70vw;
            height: calc(70vw / 1.64);
        }
        svg {
            width: 20px;
            height: 30px;
        }
        h3 {
            font-size: 4.2vw;
        }
    }

    &:hover,
    &:focus-within {
        background: ${props => props.theme.entityHoverBackground};
        border: 1px solid ${props => props.theme.entityHoverBorder};
        box-shadow: 0 0 0 0.05rem ${props => props.theme.entityHoverBorder}, ${props => props.theme.entityShadow};
    }

    &.item-appear {
        opacity: 0;
    }
    &.item-appear-active {
        opacity: 1;
        transition: opacity 300ms ease-in;
    }
    &.item-enter {
        opacity: 0;
    }
    &.item-enter-active {
        opacity: 1;
        transition: opacity 500ms ease-in;
    }
    &.item-exit {
        opacity: 1;
    }
    &.item-exit-active {
        opacity: 0;
        transition: opacity 1s ease-in;
    }
`

export default EntityContainer
  