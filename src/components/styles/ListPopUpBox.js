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

`
export default ListpopUpBox