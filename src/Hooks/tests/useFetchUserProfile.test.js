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

const fetchMock = jest.spyOn(global, "fetch")

/**
 * function to render a component
 * @functio setup
 * @param {object} state - Inital state of the component required for setup
 * @param {function} hook - React hook to be used inside component
 * @returns {object} - object, containing redux store
*/
const setup = async (state={}, hook) => {
    const store = storeFactory(state)
    await act(async() => {
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

//kinda depend on implementation
test('should not fetch user profile if user is not logged in', async () => {  
    //store.session.userId is undefined
    await setup({}, () => useFetchUserProfile({userId: 'test'}))
    expect(getUser.mock.calls.length).toBe(0)
})
//kinda depend on implementation
describe('user is logged in', () => {
    test('should fetch profile when it wasnt fetch before', async () => {
        await setup({session: {userId: 'test'}}, () => useFetchUserProfile({userId: 'test'}))
        expect(getUser.mock.calls.length).toBe(1)
    })

    test('should NOT fetch profile when it was fetch before', async () => {
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

        await setup(initialState, () => useFetchUserProfile({userId}))
        expect(getUser.mock.calls.length).toBe(0)
    })
})

//more of an integration type of a test
describe('getUser is not mocked', () => {
    const originalUserModule = jest.requireActual('../../redux-store-2.0/api/users');

    beforeEach(() => {
        getUser.mockImplementation((args) => originalUserModule.getUser(args))
    })

    test('should not fetch user profile if user is not logged in', async () => {  
        //store.session.userId is undefined
        const userId = 'test'
        const {store} = await setup({}, () => useFetchUserProfile({userId: 'test'}))
        expect(store.getState().entities.users.entities[userId]).toBeFalsy()
    })

    describe('user is logged in', () => {
        test('should fetch profile when it wasnt fetched before', async () => {
            const userId = 'test'
            const newUserId = 'notTheCorrectId'
            fetchMock.mockImplementation(() =>
                Promise.resolve({
                    json: () => Promise.resolve({
                        status: 'ok', 
                        user: {
                            [userId]: {
                                userId: newUserId
                            }
                        }
                    })
                })
            );
            const {store} = await setup({session: {userId}}, () => useFetchUserProfile({userId}))
            expect(store.getState().entities?.users.entities[userId].userId).toBe(newUserId)
        })
    
        test('should NOT fetch profile when it was fetch before', async () => {
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
            fetchMock.mockImplementation(() =>
                Promise.resolve({
                    json: () => Promise.resolve({
                        status: 'ok', 
                        user: {
                            [userId]: {
                                userId: 'notTheCorrectId'
                            }
                        }
                    })
                })
            );
    
            const {store} = await setup(initialState, () => useFetchUserProfile({userId}))
            expect(store.getState().entities.users.entities[userId].userId).toBe(userId)
        })
    })
})
        // fetchMock.mockImplementation(() =>
        //     Promise.resolve({
        //         json: () => Promise.resolve({status: 'ok', message: 'success'})
        //     })
        // );