import styled from 'styled-components';

const FollowButtonContainer = styled.div`
    width: 140px;
    align-self: center;

    @media only screen and (max-width: 500px) {
        width: 22vw;
        
        button {
            width: 20vw;
            font-size: 3.3vw;
            padding: 8px;
        }
    }

`
export default FollowButtonContainer
