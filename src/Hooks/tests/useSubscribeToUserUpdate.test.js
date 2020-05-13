import React from 'react'
import { storeFactory } from '../../utils/testHelpers'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {Provider} from 'react-redux'
import TestHook from '../../utils/testComponents/TestHook'
import useSubscribeToUserUpdate from '../useSubscribeToUserUpdate'

/**
 * function to render a component
 * @functio setup
 * @param {object} state - Inital state of the component required for setup
 * @param {function} hook - React hook to be used inside component
 * @returns {void}
*/
const setup = async (state, hook) => {
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
    close: jest.fn(),
    emit: jest.fn()
}

const testUser = {
    userId: 'test'
}

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

test('should subscribe to user when we have socket and user is passed as argument', () => {
    setup({session: {userId: 'test'}, socket: mockSocket}, () => useSubscribeToUserUpdate(testUser))
    expect(mockSocket.emit.mock.calls.length).toBe(1)
})
test('should NOT subscribe to user when we DONT have socket and user is passed as argument', () => {
    setup({session: {userId: 'test'}}, () => useSubscribeToUserUpdate(testUser))
    expect(mockSocket.emit.mock.calls.length).toBe(0)
})
test('should NOT subscribe to user when we have socket BUT user is NOT passed as argument', () => {
    setup({session: {userId: 'test'}, socket: mockSocket}, () => useSubscribeToUserUpdate())
    expect(mockSocket.emit.mock.calls.length).toBe(0)
})


