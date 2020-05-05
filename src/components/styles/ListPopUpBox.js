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
    @media only screen and (max-width: 600px) {
        >div {
            width: 97vw;
            >div {
                height: 80vh;
                padding: 10px 0 10px 10px;
                >p {
                    font-size: 15px;
                }
                /* usercard */
                >div>div>div {
                    width: 90vw;
                    button {
                        width: 20vw;
                        font-size: 3.3vw;
                        padding: 8px 10px;
                    }
                    h3 {
                        font-size: 15px;
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