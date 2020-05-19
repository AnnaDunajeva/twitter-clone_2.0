import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import {Provider} from 'react-redux'
import { storeFactory } from '../../../utils/testHelpers'
import SignUp from '../SignUp'

const setFormError = jest.fn()
const fetchMock = jest.spyOn(global, "fetch")

const testUser = {
    userId: 'test',
    firstName: 'test',
    lastName: 'test',
    email: 'test@email.com',
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
                <SignUp setFormError={setFormError}/> 
            </Provider>,
            container
        )
    })
    const username = container.querySelector('[data-test="input-username"]')
    const firstName = container.querySelector('[data-test="input-firstName"]')
    const lastName = container.querySelector('[data-test="input-lastName"]')
    const password = container.querySelector('[data-test="input-password"]')
    const email = container.querySelector('[data-test="input-email"]')
    const submit = container.querySelector('[data-test="button-signup"]')
    const form = container.querySelector('[data-test="component-signup"]')

    return {store, form, username, firstName, lastName, password, email, submit}
}

let container = null;
beforeEach(() => {
    jest.clearAllMocks()
    // jest.resetModules();

    fetchMock.mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                status: 'ok', 
                message: 'success'
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

test('should render SignUp without error', async () => {
    const {form} = await setup()
    expect(form).toBeTruthy()
    // const username = container.querySelector('[data-test="input-username"]')
})

test('should allow user to register with correct input', async () => {
    const {form, username, firstName, lastName, email, password} = await setup()

    await act(async () => {
        Simulate.change(username, {target: {value: testUser.userId}})
        Simulate.change(firstName, {target: {value: testUser.firstName}})
        Simulate.change(lastName, {target: {value: testUser.lastName}})
        Simulate.change(email, {target: {value: testUser.email}})
        Simulate.change(password, {target: {value: testUser.password}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })
    expect(setFormError.mock.calls.length).toBe(0)
    expect(fetchMock.mock.calls.length).toBe(1)
})

test('should not allow user to sign up if not all fields are filled', async () => {
    const {form, username, firstName, lastName, email, } = await setup()

    //no password provided
    await act(async () => {
        Simulate.change(username, {target: {value: testUser.userId}})
        Simulate.change(firstName, {target: {value: testUser.firstName}})
        Simulate.change(lastName, {target: {value: testUser.lastName}})
        Simulate.change(email, {target: {value: testUser.email}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })
    expect(fetchMock.mock.calls.length).toBe(0)
})

test('should not allow user to sign up if username is not valid', async () => {
    const {form, username, password, firstName, lastName, email, } = await setup()

    await act(async () => {
        Simulate.change(username, {target: {value: '! -=adad'}})
        Simulate.change(firstName, {target: {value: testUser.firstName}})
        Simulate.change(lastName, {target: {value: testUser.lastName}})
        Simulate.change(email, {target: {value: testUser.email}})
        Simulate.change(password, {target: {value: testUser.password}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })
    expect(setFormError.mock.calls.length).toBe(1)
    expect(fetchMock.mock.calls.length).toBe(0)
})

test('should not allow user to sign up if firstname is not valid', async () => {
    const {form, firstName, username, password, lastName, email, } = await setup()

    await act(async () => {
        Simulate.change(username, {target: {value: testUser.userId}})
        Simulate.change(firstName, {target: {value: 'as !=adsad'}})
        Simulate.change(lastName, {target: {value: testUser.lastName}})
        Simulate.change(email, {target: {value: testUser.email}})
        Simulate.change(password, {target: {value: testUser.password}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })
    expect(setFormError.mock.calls.length).toBe(1)
    expect(fetchMock.mock.calls.length).toBe(0)
})

test('should not allow user to sign up if lastname is not valid', async () => {
    const {form, firstName, username, password, lastName, email, } = await setup()

    await act(async () => {
        Simulate.change(username, {target: {value: testUser.userId}})
        Simulate.change(firstName, {target: {value: testUser.firstName}})
        Simulate.change(lastName, {target: {value: '<script>alert(oops...)</script>'}})
        Simulate.change(email, {target: {value: testUser.email}})
        Simulate.change(password, {target: {value: testUser.password}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })
    expect(setFormError.mock.calls.length).toBe(1)
    expect(fetchMock.mock.calls.length).toBe(0)
})

test('should not allow user to sign up if password is too short', async () => {
    const {form, firstName, username, password, lastName, email, } = await setup()

    await act(async () => {
        Simulate.change(username, {target: {value: testUser.userId}})
        Simulate.change(firstName, {target: {value: testUser.firstName}})
        Simulate.change(lastName, {target: {value: testUser.lastName}})
        Simulate.change(email, {target: {value: testUser.email}})
        Simulate.change(password, {target: {value: '1'}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })
    expect(setFormError.mock.calls.length).toBe(1)
    expect(fetchMock.mock.calls.length).toBe(0)
})

test('should not allow user to sign up if email is not valid', async () => {
    const {form, firstName, username, password, lastName, email, } = await setup()

    await act(async () => {
        Simulate.change(username, {target: {value: testUser.userId}})
        Simulate.change(firstName, {target: {value: testUser.firstName}})
        Simulate.change(lastName, {target: {value: testUser.lastName}})
        Simulate.change(email, {target: {value: '! .@a.a'}})
        Simulate.change(password, {target: {value: testUser.password}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })
    expect(setFormError.mock.calls.length).toBe(1)
    expect(fetchMock.mock.calls.length).toBe(0)
})