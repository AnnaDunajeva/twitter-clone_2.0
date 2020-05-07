import styled from 'styled-components';

const AppContainer = styled.div`
    max-width: ${props => props.logged && '900px'};
    min-width: ${props => (props.logged && '700px') || '600px'};
    min-height: 300px;
    margin: 0 auto;

    @media only screen and (max-width: 500px) {
    min-width: 280px;
    }
`
export default AppContainer
