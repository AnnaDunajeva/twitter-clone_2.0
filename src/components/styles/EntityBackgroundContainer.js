import styled, {css} from 'styled-components';
import {constants} from './themes'

//pros: 
// width in pixels, default min 400 max 600
//margin, padding
//profile

const EntityBackgroundContainer = styled.div`
    padding: ${props => props.padding};
    flex: 1;
    background: ${props => props.theme.entityContainerBackground};
    width: ${props => props.width || (props.profile && 'inherit') || '750px' };
    margin: ${props => props.margin || (props.profile && '0') || '10px auto 30px auto'};
    border-radius: ${props => (props.profile && '0') || '20px'};
    border: 1px solid ${props => props.theme.entityContainerBorder};
    box-shadow: ${props => (props.profile && 'none') || props.theme.entityContainerShadow};

    > h3 {
        text-align: center;
        margin: 10px 0;
        font-size: ${constants.mediumLargeFont};
    }
    > p {
        text-align: center;
        margin: 10px 0;
    }
    @media only screen and (max-width: 600px) {
        width: ${props => props.width || (props.profile && 'inherit') || '100vw' };
        padding: ${props => (props.profile && '5px') || '10px'};
        border-radius: ${props => (props.profile && '0') || '5px'};
        ${props => props.profile && css`
            >button:first-of-type {
                width: 22vw;
                font-size: 3.5vw;
                padding: 8px 10px;
            }
        `}
    }
`

export default EntityBackgroundContainer

EntityBackgroundContainer.defaultProps = {
    padding: '20px'
}


  