import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import {Provider} from 'react-redux'
import { storeFactory, findAttrWithQueryselector } from '../../../../utils/testHelpers'
import AdditionalUserData from '../../ProfileUpdate/AdditionalUserData'
import { LOADED } from '../../../../redux-store-2.0/constants';

const setFormError = jest.fn()
const fetchMock = jest.spyOn(global, "fetch")

const testUser = {
    userId: 'test',
    description: 'test',
    location: 'some location',
    backgroundImage: 'someBackgroundURL'
}
const newUserData = {
    location: 'something New',
    description: 'something New'
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
                <AdditionalUserData setFormError={setFormError} /> 
            </Provider>,
            container
        )
    })
    const form = findAttrWithQueryselector(container, 'component-additional-user-data')
    const description = findAttrWithQueryselector(container, 'textarea-description')
    const location = findAttrWithQueryselector(container, 'input-location')
    const deleteBackground = findAttrWithQueryselector(container, 'button-delete-background')

    return {store, form, description, location, deleteBackground}
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
    const {description, location} = await setup()
    expect(description.value).toBe(testUser.description)
    expect(location.value).toBe(testUser.location)
})

test('should update user data in case of correct input', async () => {
    const {store, form, location, description} = await setup()

    await act(async () => {
        Simulate.change(location, {target: {value: newUserData.location}})
        Simulate.change(description, {target: {value: newUserData.description}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })

    // expect(firstName.value).toBe(newUserData.firstName)
    // expect(lastName.value).toBe(newUserData.lastName)
    expect(store.getState().entities.users.entities[testUser.userId]).toMatchObject(newUserData)
})

test('should not update user data if data is not changed', async () => {
    const {form, location, description} = await setup()

    await act(async () => {
        Simulate.change(location, {target: {value: testUser.location}})
        Simulate.change(description, {target: {value: testUser.description }})
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
                        location: newUserData.location
                    }
                }
            })
        })
    );

    const {store, form, location, description} = await setup()

    await act(async () => {
        Simulate.change(location, {target: {value: newUserData.location}})
        Simulate.change(description, {target: {value: ''}})
    })
    await act(async () => {
        Simulate.submit(form, {preventDefault: () => {}})
    })

    // expect(firstName.value).toBe(newUserData.firstName)
    // expect(lastName.value).toBe(testUser.lastName)
    expect(store.getState().entities.users.entities[testUser.userId]).toMatchObject({
        ...testUser,
        location: newUserData.location
    })
})

test('should show error if input is incorrect', async() => {
    const {form, location} = await setup()

    await act(async () => {
        Simulate.change(location, {target: {value: '!"£ 0aaaa'}})
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
                        backgroundImage: null
                    }
                }
            })
        })
    );
    const {store, deleteBackground} = await setup()

    await act(async () => {
        Simulate.click(deleteBackground)
    })

    const deleteAlert = findAttrWithQueryselector(container, 'component-alert')
    const deleteButton = findAttrWithQueryselector(container, "button-delete")

    expect(deleteAlert).toBeTruthy()

    await act(async () => {
        Simulate.click(deleteButton)
    })

    expect(store.getState().entities.users.entities[testUser.userId].backgroundImage).toBe(null)
})

