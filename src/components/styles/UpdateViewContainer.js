import styled from 'styled-components';

const UpdateViewContainer = styled.div`
        display: flex;
        @media only screen and (max-width: 500px) {
            position: relative;
            
            >div{
                padding: 0 15px;
                >form {
                    h3 {
                        font-size: 5vw;
                        margin: 13px auto;
                    }
                    >div:first-of-type {
                        >input,
                        >textarea {
                            font-size: 4vw;
                            padding: 10px 16px;
                        }
                        >label {
                            font-size: 2.7vw;
                            margin: 9px 0 5px 17px;
                        }
                        button {
                            font-size: 4.5vw;
                        }
                    }
                }
            }
        }

`

export default UpdateViewContainer
