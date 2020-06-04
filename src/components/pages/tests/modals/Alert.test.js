import React from 'react'
import { shallow } from 'enzyme'
import Alert from '../../../modals/Alert'
import { findTestAttrInWrapper } from '../../../../utils/testHelpers'


/**
 * Factory function to create ShallowWrapper for the Alert component.
 * @functio setup
 * @param {object} props - Component props specific to setup
 * @returns {ShallowWrapper}
*/

const setup = (props={}) => {
    return shallow(<Alert {...props}/>)
}


test('should render without errors', () => {
    const wrapper = setup()
    
    const alertComponent = findTestAttrInWrapper(wrapper, "component-alert")
    expect(alertComponent.length).toBe(1)
})

test('should render message from props', () => {
    const message = 'my message'
    const wrapper = setup({message})

    const messageNode = findTestAttrInWrapper(wrapper, "message")
    expect(messageNode.text()).toContain(message)
})

test('should render smallMessage from props', () => {
    const smallMessage = 'my small message'
    const wrapper = setup({smallMessage})

    const smallMessageNode = findTestAttrInWrapper(wrapper, "smallMessage")
    expect(smallMessageNode.text()).toContain(smallMessage)
})

test('should render close button by default', () => {
    const wrapper = setup()

    const button = findTestAttrInWrapper(wrapper, "button-close")
    expect(button.length).toBe(1)
})

test('should NOT rende close button if this is specified through props', () => {
    const wrapper = setup({closable: false})

    const button = findTestAttrInWrapper(wrapper, "button-close")
    expect(button.length).toBe(0)
})

test('should render null when modal is closed by clicking on background', () => {
    const wrapper = setup()
    
    const alertComponent = findTestAttrInWrapper(wrapper, "component-alert")
    alertComponent.simulate('click', {preventDefault: jest.fn()})

    const alertComponentAfterClose = findTestAttrInWrapper(wrapper, "component-alert")
    expect(alertComponentAfterClose.length).toBe(0)
})

test('should render null when modal is closed by clicking on close button', () => {
    const wrapper = setup()

    const button = findTestAttrInWrapper(wrapper, "button-close")
    button.simulate('click', {preventDefault: jest.fn()})

    const alertComponentAfterClose = findTestAttrInWrapper(wrapper, "component-alert")
    expect(alertComponentAfterClose.length).toBe(0)
})

//test if onClose is run