import styled, {css} from 'styled-components';

export const DragZoneContainer = styled.div`
    cursor: pointer;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border: 2px dashed ${props => 
        (props.rejected && props.theme.red) ||
        ((props.active || props.accepted) && props.theme.hoverLinkColor) ||
        props.theme.secondaryTextColor};
    border-radius: 2px;
    background-color: ${props => props.theme.profileNavBackground};
    color: ${props => props.theme.secondaryTextColor};
    outline: none;
    transition: border .24s ease-in-out;

    p {
        margin: 20px;
        color: ${props => props.theme.secondaryTextColor}
    }
    @media only screen and (max-width: 500px) {
        height: 20vw;
        p {
            font-size: 3.5vw;
            margin: auto;
        }
    }

`
export const CropperContainer = styled.div`
        margin-top: 3px;
        display: flex;
        >div:nth-of-type(2) {
            display: flex;
            /* img preview */
            >div:first-of-type {
                overflow: hidden;
                margin: 0 5px;
            }
            /* action buttons */
            >div:last-of-type {
                display: flex;
                flex-direction: column;
            }
        }
    @media only screen and (max-width: 500px) {
        >div:first-of-type {
            ${props =>props.profile 
                    ?css`
                        width: 200px !important;
                        height: 200px !important;
                    `
                    :css`
                        width: 65vw !important;
                        height: 65vw !important;
                    `
                }
        }
        >div:nth-of-type(2) {
            flex-direction: column;
            >div:first-of-type {
                width: ${props =>props.profile ? '13vw' : '20vw'} !important;
                height: ${props =>props.profile ? `calc(13vw / ${props.aspect})` : `calc(20vw / ${props.aspect})`} !important;
                /* ${props =>props.profile 

                    ?css`
                        width: 13vw !important;
                        height: calc(13vw * ${props.aspect}) 13vw !important;
                    `
                    :css`
                        width: 20vw !important;
                        height: calc(20vw * props.aspect) !important;
                    `
                } */
            }
        }
    }
` 
export const CropResult = styled.div`
    display: flex;

    >div {
        display: flex;
        justify-content: center;
        border-radius: 2px;
        border: 1px solid ${props => props.theme.entityBorder};
        width: 130;
        height: 130;
        padding: 4;
        overflow: hidden;
    }
    img {
        display: block;
        width: auto;
        height: 100%;
    }
`

// const baseStyle = {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '5px',
//     borderWidth: 2,
//     borderRadius: 2,
//     borderColor: '#bfb6b8',
//     borderStyle: 'dashed',
//     backgroundColor: '#fafafa',
//     color: '#bdbdbd',
//     outline: 'none',
//     transition: 'border .24s ease-in-out'
//   };


//   const activeStyle = {
//     borderColor: '#2196f3'
//   };
  
//   const acceptStyle = {
//     borderColor: '#00e676'
//   };
  
//   const rejectStyle = {
//     borderColor: '#ff1744'
//   };

// const thumbsContainer = {
//   display: 'flex',
//   justifyContent: 'center',
//   borderRadius: 2,
//   border: '1px solid #eaeaea',
//   width: 130,
//   height: 130,
//   padding: 4,
// };

// const thumbInner = {
//   overflow: 'hidden'
// };

// const img = {
//   display: 'block',
//   width: 'auto',
//   height: '100%'
// };

// const text = {
//     margin: '20px'
// }
// const resultContainer = {
//     display: 'flex',
// }
// const removeBtn = {
//     fontSize: '40px',
//     marginLeft: '5px',
//     padding: '5px'
// }