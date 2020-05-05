import styled from 'styled-components';

const FollowButtonContainer = styled.div`
    width: 160px;
    align-self: center;

    @media only screen and (max-width: 600px) {
        width: 100px;
        
        button {
            width: 22vw;
            font-size: 3.5vw;
            padding: 8px 10px;
        }
    }

`
export default FollowButtonContainer
