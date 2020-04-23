import styled from 'styled-components';

const AppContainer = styled.div`
    max-width: ${props => props.logged && '900px'};
    min-width: ${props => props.logged && '700px'};
    margin: 0 auto;
`
export default AppContainer
