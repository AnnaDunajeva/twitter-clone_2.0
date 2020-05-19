import styled from 'styled-components';
import {URL} from '../../redux-store-2.0/constants'

const SignInFormsContainer = styled.div`
    color: ${props => props.theme.mainColor};
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    >div {
        width: 450px;
        margin: 0.6%  auto;
    }
    && {
        div {
            >form {
                input {
                    border: 1px solid #827786a1;
                    background-color: #827786a1;
                    font-size: 20px;
                    padding: 8px 20px;
                }
                label {
                    margin-top: 10px;
                }
                h3 {
                    margin-bottom: 0px;
                    margin-top: 10px;
                }
                a {
                    svg {
                        margin-right: 10px;
                    }
                }
                button {
                    display: block;
                    width: 100%;
                }
            } 
        }
    }
    @media only screen and (max-width: 500px) {
        && {
            div {
                >form {
                    input {
                        padding: 8px 20px;
                    }
                } 
            }
        }
    }
    @media only screen and (max-width: 500px) {
        >div {
            width: 87vw;
            margin: 2.5%  auto;
            border-radius: 20px;
        }
        && {
            div {
                >form {
                    padding: 0 17px 15px 17px;
                    input {
                        font-size: 4.5vw;
                        min-width: 60vw;
                    }
                    h3 {
                        font-size: 5vw;
                    }
                    label {
                        margin-top: 10px;
                        font-size: 3vw;
                    }
                } 
            }
        }
    }


    >div {
        background-color: #685c6da1;
        box-shadow: 0px 14px 66px 5px rgba(0,0,0,0.8);
        will-change: transform, opacity;

        &.item-enter, &.item-enter *,
        &.item-appear, &.item-appear * {
            opacity: 0;
            transform: scale(0.9);
            }
        &.item-enter-active, &.item-enter-active *,
        &.item-appear-active,  &.item-appear-active * {
            opacity: 1;
            transform: translateX(0);
            transition: opacity 300ms, transform 300ms;
        }
        &.item-exit, &.item-exit * {
            opacity: 1;
        }
        &.item-exit-active, &.item-exit-active * {
            opacity: 0;
            transform: scale(0.9);
            transition: opacity 300ms, transform 300ms;
        }
    }

`
export default SignInFormsContainer

