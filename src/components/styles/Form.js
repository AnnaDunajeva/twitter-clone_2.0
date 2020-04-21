import styled from 'styled-components';
import {constants} from './themes'

//props
// inputShadow
//labelColor
//noInputBorder
//inputBorder
//inputWidth
//margin, padding

const Form = styled.form`
    margin: ${props => props.margin};
    padding: ${props => props.padding};
    text-align: center;

    > h3 {
        font-size: ${constants.headerFontSize};
        margin: 25px 0;
        text-align: center;
        color: ${props => props.theme.mainColor};
    }
    /* for buttons, should go first in case there is no such container, then propertie will be ovewwritten bu nex one */
    > div:last-of-type {
        display: flex;
        justify-content: space-around;
    }
    > div:first-of-type {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto 20px auto;
        width: ${props => props.inputWidth || 'inherit'};
        align-items: stretch;

        > p {
            font-size: ${constants.mediumLargeFont};
            margin-bottom: 15px;
        }
        label {
            align-self: flex-start;
            font-size: ${props => props.theme.formLabelFontSize};
            margin: 15px 0 5px 15px;
            color: ${props =>(constants[props.labelColor] || props.theme.secondaryTextColor)};
        }

        > input, 
        textarea {
            padding: 12px 20px;
            margin-bottom: 5px;
            font-size: ${constants.mediumLargeFont};
            border-radius: 40px;
            border: ${props => 
                (props.noInputBorder && 'none') || 
                (props.inputBorder && `1px solid ${props.theme.mainColor}`) ||
                `1px solid ${props.theme.entityBorder}`};
            background-color: ${props => props.theme.inputBackground};
            color: ${props => props.theme.mainColor};
            min-width: ${props => props.inputWidth || '300px'};
            box-shadow: ${props => props.shadow && (constants[props.inputShadow] || props.theme.entityShadow)};
        }
        textarea {
            resize: none;
        }
        > input:hover,
        textarea:hover {
            ${props => !props.noInputBorder && `border: 1px solid ${props.theme.hoverLinkColor};`}
            box-shadow: 0 0 0 0.07rem ${props => props.theme.hoverLinkColor}, ${props => props.shadow && (constants[props.inputShadow] || props.theme.entityShadow)};

        }
        > input:focus-within,
        textarea:focus-within {
            outline: none;
            ${props => !props.noInputBorder && `border: 1px solid ${props.theme.hoverLinkColor};`}
            box-shadow: 0 0 0 0.07rem ${props => props.theme.hoverLinkColor}, ${props => props.shadow && (constants[props.inputShadow] || props.theme.entityShadow)};
        }
    }

`
export default Form

Form.defaultProps = {
    margin: 'auto',
}
