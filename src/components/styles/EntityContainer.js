import styled from 'styled-components';
import {constants} from './themes'

//pros: 
// size in pixels, default min 400 max 600

const EntityContainer = styled.div`
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
        font-size: ${constants.mediumLargeFont};
        font-weight: ${constants.boldFont};
        display: inline-block;
    }
/* tweet meta container, first div is CoverAllLink */
    > div:nth-of-type(2) {
        margin: 15px 10px 15px 0;
        flex: 2;
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
  