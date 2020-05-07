import styled from 'styled-components';
import {constants} from './themes'
import ModalContainer from './ModalContainer'

const ModalWithHeaderAndCard = styled(ModalContainer)`
    > div:first-of-type {
        padding: 0 0 10px 0;
        border-radius: 10px;
        background-color: ${props => props.theme.modalBackground};
        /* box-shadow: ${props => props.theme.modalShadow}; */
        box-shadow: 0px 14px 66px 5px rgba(0,0,0,0.8);
        width: ${props => props.theme.maxEntityWidth};
        min-height: ${props => props.theme.minModalHeight};
        margin: auto;
        margin-top: 4%;
        /* width: 650px; */
        
        > h3 {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            font-size: 21px;
            font-weight: 600;
            padding: 20px 0;
            margin-bottom: 18px;
            text-align: center;
            background-color: ${props => props.theme.modalHeaderBackground};
            color: white;
            * {
                color: white;
            }
        }

        > div:first-of-type {
            text-align: center;
            background-color: ${props => props.theme.entityHoverBackground};
            border: 1px solid ${props => props.theme.entityBorder};
            border-radius: 10px;
            padding: 20px 35px 30px 35px;
            width: 83%;
            margin: 8% auto;
            box-shadow: ${props => props.theme.entityShadow};

            > p:first-of-type {
                font-size: ${constants.mediumLargeFont};
                line-height: 2rem;
                margin-bottom: 20px;
                color: ${props => props.theme.mainColor};
            }
        }
    }
    @media only screen and (max-width: 500px) {
        > div:first-of-type {
            width: 92vw;
            min-height: 20vw;
            > h3 {
                font-size: 5.3vw;
                padding: 5vw 0;
                margin-bottom: 18px;
                >svg {
                    width: 8vw;
                    height: 8vw;
                }
            }
            > div:first-of-type {
                padding: 7vw 5vw 7vw 5vw;
                width: 82vw;
                margin: 8% auto;

                > p:first-of-type {
                    font-size: 4vw;
                    line-height: 1.5rem;
                    margin-bottom: 6vw;
                }
                input {
                    font-size: 4.5vw;
                    padding: 10px 20px; 
                }
                button {
                    font-size: 4.5vw;
                    padding: 10px;
                }
                button:first-of-type {
                    margin-right:10px;
                }
            }
        }
    }

`
export default ModalWithHeaderAndCard



//   .alert-header * {
//     color: white;
//   }
