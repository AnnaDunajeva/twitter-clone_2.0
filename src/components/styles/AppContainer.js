import styled from 'styled-components';

const AppContainer = styled.div`
    max-width: ${props => props.logged && '900px'};
    min-width: ${props => props.logged && '700px'};
    margin: 0 auto;

    @media only screen and (max-width: 600px) {
    max-width: ${props => props.logged && '600px'};
    min-width: ${props => props.logged && '300px'};
    }
`
export default AppContainer
