import styled from 'styled-components';

const BlurFilter = styled.div`
    will-change: filter;
    filter: blur(${props => props.blur ? '20px' : '0px'});
    transition: 0.2s filter;
`
export default BlurFilter
{/* <div style={{willChange: 'filter', transition: '0.2s filter', filter: `blur(${showLogin || showSignUp ? '20px' : '0px'})`}}> */}
