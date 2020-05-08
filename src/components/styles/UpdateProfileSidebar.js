import styled, {css} from 'styled-components';
import {constants} from './themes'

const UpdateprofileSidebar = styled.span.attrs({tabIndex: 0})`
        padding: 75px 0 40px 0;
        min-width: 280px;
        display: flex;
        flex-direction: column;
        margin: 0;
        align-self: stretch;
        background: ${props => props.theme.profileSidebarBackground};

        a {
            padding: 22px 0 22px 40px;
            font-size: ${constants.mediumFont};
        }

        a:hover,
        a:focus,
        a.active {
            color: ${props => props.theme.hoverLinkColor};
            background: ${props => props.theme.profileSidebarBackgroundHover};
        }
        a.active {
            font-weight: ${constants.boldFont};
            color: white;
            background: ${props => props.theme.profileSidebarBackgroundActive};
        }
        @media only screen and (max-width: 500px) {
            min-width: ${props => props.mobile && '15vw' || '60vw'};
            min-height: 65vh;
            padding-top: 15vw;
            a {
                font-size: 4vw;
                padding: 4vw 0 4vw 8vw;
            }
            ${props => !props.mobile && css`
                position: absolute;
                left: 0; top: 0;
                z-index: 1;
                min-height: 100%;
            `}

        }

`
UpdateprofileSidebar.defaultProps = {

}

export default UpdateprofileSidebar
