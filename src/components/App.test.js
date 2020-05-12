import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {Provider} from 'react-redux'
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import App from './App'
import { storeFactory } from '../utils/testHelpers'

// import * as redux from 'react-redux'

// const spy = jest.spyOn(redux, 'useSelector')
// spy.mockReturnValue({ username:'test' })


/**
 * Factory function to create ShallowWrapper for the App component.
 * @functio setup
 * @param {any} state - Inital state of the component required for setup
 * @returns {ShallowWrapper}
*/

jest.mock('react-textarea-autosize')
jest.mock('../Hooks/useSocketSetup')
jest.mock('../Hooks/useScrollToTopOnROuteChange')
jest.mock('../Hooks/useSubscribeToUserUpdate')
jest.mock('../Hooks/useLogOutOnAuthenticationError')
jest.mock('../Hooks/useToggleTheme', () => 
    function mockToggleTheme () {
        return {theme: 'light'}
    }
)
jest.mock('../Hooks/useFetchUserProfile')
jest.mock('./utils/GlobalErrors', () => () => null)
jest.mock('./utils/GlobalAlerts', () => () => null)
jest.mock('./utils/ToTopButton', () => () => null)

const setup = (state={}) => {
    const store = storeFactory(state)
    const history = createMemoryHistory()
    act(() => {
        render(
            <Provider store={store}> 
                <Router history={history}>
                    <App /> 
                </Router>
            </Provider>,
            container
        )
    })
    return {history}
}
// beforeAll(() => {
//     window.scrollTo = jest.fn()
// })
// afterAll(() => {
//     window.scrollTo.mockClear()
// })

let container = null;
beforeEach(() => {
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

test('should render App without errors', () => {
    setup()
    const appContainer = container.querySelector("[data-test='component-app']")
    expect(appContainer).toBeTruthy()
})
describe('user is not logged in', () => {
    test('should NOT render main navbar', () => {
        setup()
        const navBar = container.querySelector("[data-test='component-navbar-main']")
        expect(navBar).toBeFalsy()
    })
    
    test('should  redirect to "/login" and render SignUpLogin component when on route "/"', () => {
        const {history} = setup()
        const SignUpLogin = container.querySelector("[data-test='component-signin']")
        expect(history.location.pathname).toBe('/login')
        expect(SignUpLogin).toBeTruthy()
    })

    test('should render SignUpLogin component when on non-existing route', () => {
        const {history} = setup()
        history.push('/thisroutedoesnotexist')
        const NotFound = container.querySelector("[data-test='component-notfound']")
        const SignUpLogin = container.querySelector("[data-test='component-signin']")
        expect(history.location.pathname).toBe('/login')
        expect(NotFound).toBeFalsy()
        expect(SignUpLogin).toBeTruthy()
    })

    test('should render SignUpLogin component when on private route', () => {
        const {history} = setup()
        history.push('/users')
        const Users = container.querySelector("[data-test='component-users']")
        const SignUpLogin = container.querySelector("[data-test='component-signin']")
        expect(history.location.pathname).toBe('/login')
        expect(Users).toBeFalsy()
        expect(SignUpLogin).toBeTruthy()
    })
})

describe('user is logged in', () => {
    test('should render main navbar', () => {
        setup({session: {userId: 'test'}})
        const navBar = container.querySelector("[data-test='component-navbar-main']")
        expect(navBar).toBeTruthy()
    })

    test('should render Home component when on route "/"', () => {
        const {history} = setup({session: {userId: 'test'}})
        history.push('/')
        const Home = container.querySelector("[data-test='component-home']")
        expect(Home).toBeTruthy()
    })

    test('should render NotFound component when on route that does not exist', () => {
        const {history} = setup({session: {userId: 'test'}})
        history.push('/thisroutedoesnotexist')
        const NotFound = container.querySelector("[data-test='component-notfound']")
        expect(history.location.pathname).toBe('/thisroutedoesnotexist')
        expect(NotFound).toBeTruthy()
    })
})
