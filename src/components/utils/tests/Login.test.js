import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import {Provider} from 'react-redux'
import { storeFactory } from '../../../utils/testHelpers'
import Login from '../Login'

const setFormError = jest.fn()
const showForgotPassword = jest.fn()
const fetchMock = jest.spyOn(global, "fetch")

const testUser = {
    userId: 'test',
    password: '123456'
}

/**
 * function to render a component
 * @functio setup
 * @param {object} state - Inital state of the component required for setup
 * @returns {object} - object, cantaining redux strore and form input elements with submit button and form container
*/
const setup = async (state={}) => {
    const store = storeFactory(state)
    await act(async () => {
        render(
            <Provider store={store}> 
                <Login setFormError={setFormError} showForgotPassword={showForgotPassword}/> 
            </Provider>,
            container
        )
    })
    const username = container.querySelector('[data-test="input-username"]')
    const password = container.querySelector('[data-test="input-password"]')
    const submit = container.querySelector('[data-test="button-login"]')
    const form = container.querySelector('[data-test="component-login"]')
    const forgotPassword = container.querySelector('[data-test="link-forgot-password"]')

    return {store, form, username, password, submit, forgotPassword}
}

let container = null;
beforeEach(() => {
    jest.clearAllMocks()

    fetchMock.mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                status: 'ok', 
                user: {
                    [testUser.userId]: testUser
                }
            })
        })
    );
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

test('should render Login without error', async () => {
    const {form} = await setup()
    expect(form).toBeTruthy()
    // const username = container.querySelector('[data-test="input-username"]')
})

test('should login user with correct input', async () => {
    const {form, username, password, store} = await setup()

    await act(async () => {
        Simulate.change(username, {target: {value: testUser.userId}})
        Simulate.change(password, {target: {value: testUser.password}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })
    expect(setFormError.mock.calls.length).toBe(0)
    expect(fetchMock.mock.calls.length).toBe(1)
    expect(store.getState().session.userId).toBe(testUser.userId)
})

test('should not allow to login user when not all input fields are filled', async () => {
    const {form, username} = await setup()

    await act(async () => {
        Simulate.change(username, {target: {value: testUser.userId}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })
    expect(fetchMock.mock.calls.length).toBe(0)
})

test('should not allow to login user when username is invalid', async () => {
    const {form, password, username} = await setup()

    await act(async () => {
        Simulate.change(username, {target: {value: 'q!qwq #'}})
        Simulate.change(password, {target: {value: testUser.password}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })
    
    expect(setFormError.mock.calls.length).toBe(1)
    expect(fetchMock.mock.calls.length).toBe(0)
})

test('should enable forgotPassword modal when forgot password link is clicked', async () => {
    const {forgotPassword} = await setup()

    await act(async () => {
        Simulate.click(forgotPassword, {preventDefault: () => {}})
    })
    
    expect(showForgotPassword.mock.calls.length).toBe(1)
})
