import styled from 'styled-components';
import {constants} from './themes'

//props:
// primary, blue, secondary, default transparent
// small, mediumSmall, medium, large OR
// size: pixels, default inherit
// circle
// fontSize: in pixels, OR smallFont, mediumSmallFont, mediumFont, mediumLargeFont, largeFont, default mediumLargeFont
// shadow: lightShadow, mediumLightShadow, darkShadow, blurredMediumShadow, bottomLightShadow, default none
// uppercase, default false
// disabledMediumLight, disabledLight, default transparent
// center, default false OR
// margin: pixels, default 0
// padding: default 10px 15px
// bold 
// float

const MainButton = styled.button`
    display: block;
    position: relative;
    text-align: center;
    ${props => props.float && `float: ${props.float};`}
    color: ${props => 
        (props.primary && props.theme.invertedMainColor) || 
        (props.secondary && props.theme.mainColor) || 
        (props.blue && 'white') ||
        props.theme.mainColor};
    background-color: ${props => 
        (props.primary && props.theme.mainColor) || 
        (props.blue && props.theme.blue) || 
        (props.secondary && 'transparent') || 
        'transparent'};
    border: 1px solid ${props => 
        ((props.primary || props.secondary) && props.theme.mainColor) || 
        (props.blue && props.theme.blue) || 
        props.theme.mainColor};
    border-radius: ${constants.radiusLarge};
    box-shadow: 0 0 0 0.05rem ${props => (
            ((props.primary || props.secondary) && props.theme.mainColor) || 
            (props.blue && props.theme.blue) || 
            props.theme.mainColor )
            + 
            (props.shadow ? (', '+ props.theme.entityShadow) : '')};
    width: ${props => 
        (props.small && '120px') || 
        (props.mediumSmall && '160px') ||
        (props.medium && '200px') || 
        (props.large && '350px') || 
        props.size };
    ${props => props.circle && `height: ${props.size};`}    
    font-size: ${props => props.fontSize && constants[props.fontSize] 
                ? constants[props.fontSize]
                : props.fontSize};
    ${props => props.bold && `font-weight: ${constants.boldFont};`}    
    ${props => props.uppercase && 'text-transform: uppercase;'}
    padding: ${props => props.padding};
    margin: ${props => 
        (props.center && 'auto') || 
        (props.margin)};

    &:hover {
        cursor: pointer;
        background-color: ${props => 
            (props.primary && props.theme.lightMainColor) ||
            (props.secondary && props.theme.blue) ||
            (props.blue && props.theme.mediumBlue) ||
            props.theme.blue};
        border: 1px solid ${props => 
            (props.primary && props.theme.lightMainColor) ||
            (props.secondary && props.theme.blue) ||
            (props.blue && props.theme.mediumBlue) ||
            props.theme.blue};
        box-shadow: 0 0 0 0.05rem ${props => (
                (props.primary && props.theme.lightMainColor) ||
                (props.secondary && props.theme.blue) ||
                (props.blue && props.theme.mediumBlue) ||
                props.theme.blue)
                + 
                (props.shadow ? (', '+ props.theme.entityShadow) : '')};
        color: ${props => 
            ((props.secondary || props.blue) && 'white') ||
            (props.primary && props.theme.invertedMainColor) ||
            'white'};
    }
    &:focus-within {
        background-color: ${props => 
            (props.primary && props.theme.lightMainColor) ||
            (props.secondary && props.theme.blue) ||
            (props.blue && props.theme.mediumBlue) ||
            props.theme.blue};
        border: 1px solid ${props => 
            (props.primary && props.theme.lightMainColor) ||
            (props.secondary && props.theme.blue) ||
            (props.blue && props.theme.mediumBlue) ||
            props.theme.blue};
        color: ${props => 
            ((props.secondary || props.blue) && 'white') ||
            (props.primary && props.theme.invertedMainColor) ||
            'white'};
        outline: none;
        box-shadow: 0 0 0 0.15rem ${props => props.theme.invertedMainColor}, 0 0 0 0.25rem ${props => 
            (props.blue && props.theme.mediumBlue) ||
            ((props.primary || props.secondary) && props.theme.blue) || 
            props.theme.blue} ${props =>props.shadow ? (', '+ props.theme.entityShadow) : ''};
    }
    &:disabled,
    &:disabled:hover {
        background-color: ${props => 
            (props.disabledLight && props.theme.disabledButtonBackground) ||
            (props.disabledMediumLight && props.theme.disabledButtonBackgroundPale) ||
            'transparent'};
        border: 1px solid ${props => props.theme.disabledButtonColor};
        box-shadow: 0 0 0 0.05rem ${props => 
           props.theme.disabledButtonColor
            + 
            (props.shadow ? (', '+ props.theme.entityShadow) : '')};
        color: ${props => props.theme.disabledButtonColor};
        cursor: default;
    }

    @media only screen and (max-width: 500px) {
        font-size: 4.5vw;
    }
`

MainButton.defaultProps = {
    size: 'inherit',
    margin: 0,
    fontSize: 'mediumLargeFont',
    padding: '10px 15px'
}

export default MainButton
