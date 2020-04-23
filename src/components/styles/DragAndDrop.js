import styled from 'styled-components';

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

`
export const CropperContainer = styled.div`
    >div:first-of-type {
        display: flex;

        /* action buttons */
        >div:last-of-type {
            display: flex;
            flex-direction: column;
        }
    }
    /* img preview */
    >div:last-of-type {
        overflow: hidden;
        margin-top: 3px;
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