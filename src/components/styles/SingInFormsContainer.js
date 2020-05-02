import styled from 'styled-components';
import {URL} from '../../redux-store-2.0/constants'

const SignInFormsContainer = styled.div`
    min-width: 500px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* background-color: #3d383d81; */

    && {
        div {
            >form {
                input {
                    border: 1px solid #827786a1;
                    background-color: #827786a1;
                }
            } 
        }
    }
    >div {
        background-color: #685c6da1;
        width: 450px;
        margin: 0.6%  auto;
        box-shadow: 0px 14px 66px 5px rgba(0,0,0,0.8);

        /* position: absolute;
        top:0; right: 0;
        margin: 0;
        height: 100%;
        border-radius: 0; */


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

// const SignInFormsContainer = styled.div`
//     min-width: 500px;
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     /* background-color: #3d383d81; */

//     >div {
//         background-color: #685c6da1;
//         /* padding: 1px 60px 35px 60px; */
//         width: 450px;
//         margin: 0 auto;
//         border: 1px solid white;
//         box-shadow: 0px 14px 66px 5px rgba(0,0,0,0.8);
//         &.item-appear {
//             opacity: 0;
//             transform: scale(0.9);
//         }
//         &.item-appear-active {
//             opacity: 1;
//             transform: translateX(0);
//             transition: opacity 500ms, transform 500ms;
//         }
//         &.item-enter, &.item-enter * {
//         opacity: 0;
//         transform: scale(0.9);
//         }
//         &.item-enter-active, &.item-enter-active * {
//             opacity: 1;
//             transform: translateX(0);
//             transition: opacity 500ms, transform 500ms;
//         }
//         &.item-exit, &.item-exit * {
//             opacity: 1;
//         }
//         &.item-exit-active, &.item-exit-active * {
//             opacity: 0;
//             transform: scale(0.9);
//             transition: opacity 500ms, transform 500ms;
//         }

//         >form {
//             input {
//                 border: 1px solid white;
//                 background-color: #685c6da1;
//             }
//         }
//     }

// `
// export default SignInFormsContainer


// import styled from 'styled-components';

// const SignInFormsContainer = styled.div`
//     display: flex;
//     justify-content: space-evenly;
//     padding-top: 75px;

//     >div:last-of-type {
//         border-left: 1px solid  #ffffff;
//     }
// `
// export default SignInFormsContainer


// import styled from 'styled-components';

// const SignInFormsContainer = styled.div`
//     position: absolute;
//     right: 0;
//     top: 0;
//     padding: 0 100px;
//     /* background-color: #dbdbdb23; */
//     background-color: #dbdbdb23;
//     height: 100%;

//     >div {
//         display: flex;
//         justify-content: space-around;
//         position: absolute;
//         left: 0;
//         top: 0;
//         /* background-color: #4b4b4b33; */
//         width: 100%;
        
//         div {
//             padding: 20px 0;
//             color: ${props => props.theme.mainColor};
//             font-size: 20px;
//             flex: 1;
//             text-align: center;
//             cursor: pointer;
//         }
//         div:first-of-type {
//             background-color: ${props => props.showLogin && '#d3d3d349' || '#4b4b4b33'};
//         }
//         div:last-of-type {
//             background-color: ${props => !props.showLogin && '#d3d3d349' || '#4b4b4b33'};
//         }
//         div:hover {
//             background-color: #44444446;
//         }
//         div:focus {
//             outline: none;
//             background-color: #d3d3d349;
//         }

//     }
//     >form {
//         margin-top: 130px;
//     }
// `
// export default SignInFormsContainer


// // import styled from 'styled-components';

// // const SignInFormsContainer = styled.div`
// //     display: flex;
// //     justify-content: space-evenly;
// //     padding-top: 75px;

// //     >div:last-of-type {
// //         border-left: 1px solid  #ffffff;
// //     }
// // `
// // export default SignInFormsContainer
