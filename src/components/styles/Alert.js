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

        @media only screen and (max-width: 500px) {
            width: 300px;
            > p {
                font-size: 16px;
                line-height: 1.5rem;
                margin: 10px 15px;
            }
            > p:nth-of-type(2) {
                font-size: 13px;
                color: ${props => props.theme.lightMainColor};
            }
            /* buttons container */
            > div:last-of-type {
                button {
                    font-size: 15px;
                    width: 100px;
                    margin: 15px;
                }
            }
        }
    }
`
export default Alert
