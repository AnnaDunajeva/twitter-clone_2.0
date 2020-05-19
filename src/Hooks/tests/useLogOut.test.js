import React from 'react'
import { storeFactory } from '../../utils/testHelpers'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {Provider} from 'react-redux'
import useLogOut from '../useLogOut'

const fetchMock = jest.spyOn(global, "fetch")

const TestHook = () => {
    const logOutUser = useLogOut()
    logOutUser()
    return null
}

/**
 * function to render a component
 * @functio setup
 * @param {object} state - Inital state of the component required for setup
 * @returns {object} - redux store
*/
const setup = async (state={}) => {
    const store = storeFactory(state)
     await act(async () => {
        render(
            <Provider store={store}> 
                <TestHook />
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

test('should logOut user', async () => {  
    const {store} = await setup({session: {userId: 'test'}})

    expect(store.getState().session.userId).toBeFalsy()
})

