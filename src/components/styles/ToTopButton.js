import IconButton from './IconButton'
import styled from 'styled-components'

const ToTopButton = styled(IconButton)`
    position: fixed;
    bottom: 8%;
    right: 8%;

    @media only screen and (max-width: 500px) {
        bottom: 7vw;
        right: 7vw;
        border: 1px solid ${props => props.theme.mainColor};
        background-color: ${props => props.theme.tweetResponseOnContentBackground};
    }
`
export default ToTopButton