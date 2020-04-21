import styled from 'styled-components';
import {constants} from './themes'
import ModalContainer from './ModalContainer'

const Alert = styled(ModalContainer)`
    > div:first-of-type {
        margin: 15% auto;
        padding: 20px;
        border-radius: 10px;
        background-color: ${props => props.theme.modalBackground};
        box-shadow: ${props => props.theme.modalShadow};
        width: ${props => props.theme.maxEntityWidth};
        min-height: ${props => props.theme.minModalHeight};
        
        /* main message */
        > p {
            font-size: ${constants.largeFont};
            text-align: center;
            line-height: 2rem;
            margin: 20px 25px;
            height: 100%;
            vertical-align: middle;
            color: ${props => props.theme.mainColor};
        }
        /* secondary message */
        > p:nth-of-type(2) {
            font-size: ${constants.mediumLargeFont};
            color: ${props => props.theme.lightMainColor};
        }
        /* buttons container */
        > div:last-of-type {
            display: flex;
            justify-content: space-around;
        }
    }

`
export default Alert
