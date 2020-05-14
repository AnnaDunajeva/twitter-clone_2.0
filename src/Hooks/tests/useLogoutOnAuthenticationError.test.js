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
// const fetchMock = jest.spyOn(global, "fetch")

/**
 * function to render a component
 * @functio setup
 * @param {object} state - Inital state of the component required for setup
 * @param {function} hook - React hook to be used inside component
 * @returns {void}
*/
const setup = (state={}, hook) => {
    const store = storeFactory(state)
     act(() => {
        render(
            <Provider store={store}> 
                <TestHook hook={hook} />
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

describe('useDispatch is mocked', () => {
    const mockDispatch = jest.fn()
    beforeAll(() => {
        useDispatch.mockReturnValue(mockDispatch)
    })
    test('should call dispatch to empty store if server sent authentication error', () => {      
        setup({session: {userId: 'test'}, errors: {SOME_ACTION: AUTHENTICATION_FAILED}}, useLogOutOnAuthenticationError)
        expect(mockDispatch.mock.calls.length).toBe(1)
    })
})

describe('useDispatch is NOT mocked  (mocked with original implementation)', () => {
    const originalUseDispatch = jest.requireActual('react-redux/lib/hooks/useDispatch');

    beforeEach(() => {
        useDispatch.mockImplementation(() => originalUseDispatch.useDispatch())
    })
    test('should logout user if server sent authentication error if user is logged in', () => {  
        // fetchMock.mockImplementation(() =>
        //     Promise.resolve({
        //         json: () => Promise.resolve({status: 'ok', message: 'success'})
        //     })
        // );
        const {store} = setup({session: {userId: 'test'}, errors: {SOME_ACTION: AUTHENTICATION_FAILED}}, useLogOutOnAuthenticationError)
    
        expect(store.getState().session.userId).toBeFalsy()
    })
    test('should NOT logout user if server sent authentication error and user is logged out', () => {  
        const {store} = setup({errors: {SOME_ACTION: AUTHENTICATION_FAILED}}, useLogOutOnAuthenticationError)
    
        //store is not changed
        expect(store.getState().session.userId).toBeFalsy()
        expect(store.getState().errors.SOME_ACTION).toBe(AUTHENTICATION_FAILED)
    })
})

//this does not work for some reason
// test('should call dispatch to empty store if server sent authentication error', async () => {      
//     jest.doMock('react-redux/lib/hooks/useDispatch', () => {
//         return {
//             useDispatch: jest.fn()
//         }
//     })
//     return import('react-redux/lib/hooks/useDispatch').then(async ({useDispatch}) => {
//         const mockDispatch = jest.fn()
//         useDispatch.mockReturnValue(mockDispatch)
//         const {store} = await setup({session: {userId: 'test'}, errors: {SOME_ACTION: AUTHENTICATION_FAILED}}, useLogOutOnAuthenticationError)
//         console.log(mockDispatch.mock)
//         console.log('second test: ', store.getState())
//         expect(mockDispatch.mock.calls.length).toBe(1)
//     })
// })