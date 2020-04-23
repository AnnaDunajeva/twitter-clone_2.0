import styled from 'styled-components';
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

`

export default EntityBackgroundContainer

EntityBackgroundContainer.defaultProps = {
    padding: '20px'
}


  