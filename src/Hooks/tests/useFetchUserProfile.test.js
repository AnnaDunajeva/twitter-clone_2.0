import React from 'react'
import { storeFactory } from '../../utils/testHelpers'
import {getUser} from '../../redux-store-2.0/api/users'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {Provider} from 'react-redux'
import TestHook from '../../utils/testComponents/TestHook'
import useFetchUserProfile from '../useFetchUserProfile'
import {LOADED} from '../../redux-store-2.0/constants'

jest.mock('../../redux-store-2.0/api/users', () => (
    {
        getUser: jest.fn(() => () => {}),
    }
))

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

let container = null;
beforeEach(() => {
    //clear data on mock collected from preveous test 
    getUser.mockClear()

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

test('should not fetch user profile if user is not logged in', () => {  
    //store.session.userId is undefined
    setup({}, () => useFetchUserProfile({userId: 'test'}))
    expect(getUser.mock.calls.length).toBe(0)
})

describe('user is logged in', () => {
    test('should fetch profile when it wasnt fetch before', () => {
        setup({session: {userId: 'test'}}, () => useFetchUserProfile({userId: 'test'}))
        expect(getUser.mock.calls.length).toBe(1)
    })

    test('should NOT fetch profile when it was fetch before', () => {
        const userId = 'test'
        const initialState = {
            session: {
                userId
            },
            entities: {
                users: {
                    entities: {
                        [userId]: {
                            userId
                        }
                    },
                    fetchStatus: {
                        [userId]: LOADED
                    },
                }
            }
        }

        setup(initialState, () => useFetchUserProfile({userId}))
        expect(getUser.mock.calls.length).toBe(0)
    })
})