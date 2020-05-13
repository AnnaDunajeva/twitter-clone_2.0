import React from 'react'
import { storeFactory } from '../../utils/testHelpers'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {Provider} from 'react-redux'
import TestHook from '../../utils/testComponents/TestHook'
import useLogOutOnAuthenticationError from '../useLogOutOnAuthenticationError'
import {AUTHENTICATION_FAILED} from '../../redux-store-2.0/constants'
import {useDispatch} from 'react-redux/lib/hooks/useDispatch'

jest.mock('react-redux/lib/hooks/useDispatch', () => {
    return {
        useDispatch: jest.fn()
    }
})


/**
 * function to render a component
 * @functio setup
 * @param {object} state - Inital state of the component required for setup
 * @param {function} hook - React hook to be used inside component
 * @returns {void}
*/
const setup = async (state={}, hook) => {
    const store = storeFactory(state)
    act(() => {
        render(
            <Provider store={store}> 
                <TestHook hook={hook} />
            </Provider>,
            container
        )
    })
}

//mocksocket that can be used in test
const mockSocket = {
    on: () => {},
    close: jest.fn()
}

const mockDispatch = jest.fn()
beforeAll(() => {
    useDispatch.mockReturnValue(mockDispatch)
})

let container = null;
beforeEach(() => {
    //clear data on mock collected from preveous test 
    jest.clearAllMocks()

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

test('should logout user is server sent authentication error', () => {  
    setup({session: {userId: 'test'}, errors: {SOME_ACTION: AUTHENTICATION_FAILED}}, useLogOutOnAuthenticationError)
    expect(mockDispatch.mock.calls.length).toBe(1)
})
