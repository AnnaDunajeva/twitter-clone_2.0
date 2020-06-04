import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import {Provider} from 'react-redux'
import { storeFactory, findAttrWithQueryselector } from '../../../../utils/testHelpers'
import GeneralUserData from '../../ProfileUpdate/GeneralUserData'
import { LOADED } from '../../../../redux-store-2.0/constants';

const setFormError = jest.fn()
const fetchMock = jest.spyOn(global, "fetch")

const testUser = {
    userId: 'test',
    firstName: 'test',
    lastName: 'test',
    avatar: 'someAvatarUrl'
}
const newUserData = {
    firstName: 'something New',
    lastName: 'something New'
}
const initalStateWithUser = {
    entities: {
        users: {
            entities: {
                [testUser.userId]: testUser
            },
            fetchStatus: LOADED
        }
    },
    session: {
        userId: testUser.userId,
        fetchStatus: LOADED
    }
}

const setup = async (state = initalStateWithUser) => {
    const store = storeFactory(state)
    await act(async () => {
        render(
            <Provider store={store}> 
                <GeneralUserData setFormError={setFormError} /> 
            </Provider>,
            container
        )
    })
    const form = findAttrWithQueryselector(container, 'component-general-user-data')
    const firstName = findAttrWithQueryselector(container, 'input-firstname')
    const lastName = findAttrWithQueryselector(container, 'input-lastname')
    const deleteAvatar = findAttrWithQueryselector(container, 'button-delete-avatar')

    return {store, form, firstName, lastName, deleteAvatar}
}

let container = null;
beforeEach(() => {
    jest.clearAllMocks()

    fetchMock.mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                status: 'ok', 
                user: {
                    [testUser.userId]: {
                        ...testUser,
                        ...newUserData
                    }
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

test('should render without error', async () => {
    const {form} = await setup()
    expect(form).toBeTruthy()
})

test('should render current user data', async () => {
    const {firstName, lastName} = await setup()
    expect(firstName.value).toBe(testUser.firstName)
    expect(lastName.value).toBe(testUser.lastName)
})

test('should update user data in case of correct input', async () => {
    const {store, form, firstName, lastName} = await setup()

    await act(async () => {
        Simulate.change(firstName, {target: {value: newUserData.firstName}})
        Simulate.change(lastName, {target: {value: newUserData.lastName}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })

    // expect(firstName.value).toBe(newUserData.firstName)
    // expect(lastName.value).toBe(newUserData.lastName)
    expect(store.getState().entities.users.entities[testUser.userId]).toMatchObject(newUserData)
})

test('should not update user data if data is not changed', async () => {
    const {form, firstName, lastName} = await setup()

    await act(async () => {
        Simulate.change(firstName, {target: {value: testUser.firstName}})
        Simulate.change(lastName, {target: {value: testUser.lastName }})
    })

    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })

    expect(fetchMock.mock.calls.length).toBe(0)
})

test('should not update user data with empty fields', async () => {
    fetchMock.mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                status: 'ok', 
                user: {
                    [testUser.userId]: {
                        ...testUser,
                        firstName: newUserData.firstName
                    }
                }
            })
        })
    );

    const {store, form, firstName, lastName} = await setup()

    await act(async () => {
        Simulate.change(firstName, {target: {value: newUserData.firstName}})
        Simulate.change(lastName, {target: {value: ''}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })

    // expect(firstName.value).toBe(newUserData.firstName)
    // expect(lastName.value).toBe(testUser.lastName)
    expect(store.getState().entities.users.entities[testUser.userId]).toMatchObject({
        ...testUser,
        firstName: newUserData.firstName
    })
})

test('should show error if input is incorrect', async() => {
    const {form, firstName} = await setup()

    await act(async () => {
        Simulate.change(firstName, {target: {value: '!"£ 0aaaa'}})
    })

    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })

    expect(fetchMock.mock.calls.length).toBe(0)
    expect(setFormError.mock.calls.length).toBe(1)
})

test('should delete avatar image', async () => {
    fetchMock.mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                status: 'ok', 
                user: {
                    [testUser.userId]: {
                        ...testUser,
                        avatar: null
                    }
                }
            })
        })
    );
    const {store, deleteAvatar} = await setup()

    await act(async () => {
        Simulate.click(deleteAvatar)
    })

    const deleteAlert = findAttrWithQueryselector(container, 'component-alert')
    const deleteButton = findAttrWithQueryselector(container, "button-delete")

    expect(deleteAlert).toBeTruthy()

    await act(async () => {
        Simulate.click(deleteButton)
    })

    expect(store.getState().entities.users.entities[testUser.userId].avatar).toBe(null)
})

