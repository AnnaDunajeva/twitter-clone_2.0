import styled from 'styled-components';
import ModalContainer from './ModalContainer'
import {constants} from './themes'

const ListpopUpBox = styled(ModalContainer)`
    > div {
        margin: 0 auto;
        margin-top: 60px;
        border-radius: 10px;
        background-color: ${props => props.theme.modalBackground};
        box-shadow: ${props => props.theme.modalShadow};
        width: 700px;
        min-height: ${props => props.theme.minModalHeight};
        overflow: hidden;

        > div {
            padding: 20px;
            height: 600px;
            overflow-y: scroll;

            >p {
                font-size: ${constants.largeFont};
                text-align: center;
                margin: 10px 0;
            }
        }
    }
    @media only screen and (max-width: 500px) {
        >div {
            width: 93vw;
            >div {
                height: 80vh;
                padding: 10px 0 10px 10px;
                >p {
                    font-size: 4.3vw;
                }
                /* usercard */
                >div>div>div {
                    width: 88vw;
                    button {
                        width: 18vw;
                        font-size: 3vw;
                        padding: 7px;
                    }
                    h3 {
                        font-size: 4vw;
                        text-align: start;
                    }
                    p {
                        font-size: 3vw !important;
                    }
                }
            }
        }
    }
`
export default ListpopUpBox