import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'react-redux'
import App from './App'
import { findTestAttrInWrapper } from '../utils/testHelpers'
import { storeFactory } from '../utils/testHelpers'
import {getAuthedUserProfile} from '../redux-store-2.0/entities/users/selectors'
import {getAuthedUserId} from '../redux-store-2.0/session/selectors'

configure({ adapter: new Adapter() })

/**
 * Factory function to create ShallowWrapper for the App component.
 * @functio setup
 * @param {any} state - Inital state of the component required for setup
 * @returns {ShallowWrapper}
*/

const setup = (state={}) => {
    const store = storeFactory(state)
    const wrapper = mount(
        <Provider store={store}> 
            <App /> 
        </Provider>
    )
    return wrapper
}

test('should render App without errors', () => {
    const wrapper = setup()
    console.log(wrapper.debug())
    const appComponent = findTestAttrInWrapper(wrapper, "component-app")
    expect(appComponent.length).toBe(1)
})