import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import {Provider} from 'react-redux'
import { storeFactory, findAttrWithQueryselector } from '../../../utils/testHelpers'
import { getOauthUserData, getUserIdFromCookie } from '../../../utils/helpers'
import CompleteAccountVerificationAfterOauth from '../CompleteAccountCreationAfterOauthSignup'

jest.mock('../../../utils/helpers', () => {
    const original = jest.requireActual('../../../utils/helpers')
    return {
        ...original,
        getOauthUserData: jest.fn(),
        getUserIdFromCookie: jest.fn()
    }
})
const setFormError = jest.fn()
const fetchMock = jest.spyOn(global, "fetch")

const testUser = {
    userId: 'test'
}

const setup = async (state={}) => {
    const store = storeFactory(state)
    await act(async () => {
        render(
            <Provider store={store}> 
                <CompleteAccountVerificationAfterOauth setFormError={setFormError}/> 
            </Provider>,
            container
        )
    })
    const username = findAttrWithQueryselector(container, 'input-username')
    const form = findAttrWithQueryselector(container, 'component-complete-oauth')

    return {store, form, username}
}

let container = null;
beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules();

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
    getUserIdFromCookie.mockImplementation(() => testUser.userId)
    getOauthUserData.mockImplementation(() => ({
        firstName: 'test',
        lastName: 'test'
    }))
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

test('should render CompleteAccountCreation without error', async () => {
    const {form} = await setup()
    expect(form).toBeTruthy()
})

test('should NOT render CompleteAccountCreation if server did not send oauth data', async () => {
    getOauthUserData.mockImplementation(() => null)
    const {form} = await setup()
    expect(form).toBeFalsy()
})

test('should login user after successful account creation', async () => {
    const {form, username, store} = await setup()

    await act(async () => {
        Simulate.change(username, {target: {value: testUser.userId}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })
    expect(fetchMock.mock.calls.length).toBe(1)
    expect(store.getState().session.userId).toBe(testUser.userId)
})

test('should not allow to submit form when not all input fields are filled', async () => {
    const {form} = await setup()

    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })
    expect(fetchMock.mock.calls.length).toBe(0)
})

test('should not allow to login user when username is invalid', async () => {
    const {form, username} = await setup()

    await act(async () => {
        Simulate.change(username, {target: {value: 'q!qwq #'}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })
    
    expect(setFormError.mock.calls.length).toBe(1)
    expect(fetchMock.mock.calls.length).toBe(0)
})
