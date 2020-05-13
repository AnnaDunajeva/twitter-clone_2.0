import React from 'react'
import { storeFactory } from '../../utils/testHelpers'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {Provider} from 'react-redux'
import TestHook from '../../utils/testComponents/TestHook'
import useSocketSetup from '../useSocketSetup'
import io from 'socket.io-client';
import usePageVisibility from '../usePageVisibility'

jest.mock('socket.io-client')
jest.mock('../usePageVisibility')

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
    close: jest.fn()
}

beforeAll(() => {
    //make mock io return socket with relevant mock methods on it, that can also be tracked 
    //(and avoid irrelevant errors in console)
    io.mockReturnValue(mockSocket)
})

let container = null;
beforeEach(() => {
    //clear data on mock collected from preveous test 
    io.mockClear()
    usePageVisibility.mockClear()
    mockSocket.close.mockClear()

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

test('should NOT create socket if user is not logged in', () => {  
    setup({}, () => useSocketSetup())
    expect(io.mock.calls.length).toBe(0)
})

test('should NOT create socket if socket already exist in the store', () => {  
    setup({socket: mockSocket}, () => useSocketSetup())
    expect(io.mock.calls.length).toBe(0)
})

test('should NOT close socket when we DONT have one and window is NOT in view', () => {
    usePageVisibility.mockReturnValueOnce(false)  
    setup({session: {userId: 'test'}}, () => useSocketSetup())
    expect(mockSocket.close.mock.calls.length).toBe(0)
})

describe('user logged in', () => {
    test('should create socket if socket does not exist in the store and browser tab is in view', () => {
        usePageVisibility.mockReturnValueOnce(true)  
        setup({session: {userId: 'test'}}, () => useSocketSetup())
        expect(io.mock.calls.length).toBe(1)
    })

    test('should NOT create socket if socket does not exist in the store BUT browser tab is NOT in view', () => {
        usePageVisibility.mockReturnValueOnce(false)  
        setup({session: {userId: 'test'}}, () => useSocketSetup())
        expect(io.mock.calls.length).toBe(0)
    })

    test('should close socket when we have one and window is NOT in view', () => {
        usePageVisibility.mockReturnValueOnce(false)  
        setup({session: {userId: 'test'}, socket: mockSocket}, () => useSocketSetup())
        expect(mockSocket.close.mock.calls.length).toBe(1)
    })
})


