import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { Provider } from 'react-redux'
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { storeFactory } from '../../../utils/testHelpers'
import SignUpLogin from '../SignUpLogin'
import { getOauthUserData } from '../../../utils/helpers'

jest.mock('../../../utils/helpers', () => {
    const original = jest.requireActual('../../../utils/helpers')
    return {
        ...original,
        getOauthUserData: jest.fn()
    }
})

const setup = async (state={}) => {
    const store = storeFactory(state)
    const history = createMemoryHistory()
    await act(async() => {
        render(
            <Provider store={store}> 
                <Router history={history}>
                    <SignUpLogin /> 
                </Router>
            </Provider>,
            container
        )
    })
    return {store}
}

let container = null;
beforeEach(() => {
    //clear data on mock collected from preveous test 
    jest.clearAllMocks()
    jest.resetModules();

    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('should render SignUpLogin without errors', async () => {
    await setup()
    const signuploginContainer = container.querySelector("[data-test='component-signuplogin']")
    expect(signuploginContainer).toBeTruthy()
})

test('should NOT render SignUpLogin if user is logged in', async () => {
    await setup({session: {userId: 'test'}})
    const signuploginContainer = container.querySelector("[data-test='component-signuplogin']")
    expect(signuploginContainer).toBeFalsy()
})

test('should render login form when clicked on login button and signup form when clicked on signup button', async () => {
    await setup()
    const loginButton = container.querySelector("[data-test='button-login']")
    
    Simulate.click(loginButton)
    
    const loginForm = container.querySelector("[data-test='component-login']")
    expect(loginForm).toBeTruthy()

    const signupButton = container.querySelector("[data-test='button-signup']")
    
    Simulate.click(signupButton)
    
    const signupForm = container.querySelector("[data-test='component-signup']")
    expect(signupForm).toBeTruthy()
})

test('should show complete registrattion form after google signin if user hasnt created account previously', () => {

})