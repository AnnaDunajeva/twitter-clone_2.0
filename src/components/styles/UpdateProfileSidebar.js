import styled from 'styled-components';
import {constants} from './themes'

const UpdateprofileSidebar = styled.span.attrs({tabIndex: 0})`
        padding: 75px 0 40px 0;
        width: 320px;
        display: flex;
        flex-direction: column;
        margin: 0;
        align-self: stretch;
        background: ${props => props.theme.profileNavBackground};

        a {
            padding: 22px 0 22px 40px;
            font-size: ${constants.mediumLargeFont};
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

`
UpdateprofileSidebar.defaultProps = {

}

export default UpdateprofileSidebar
