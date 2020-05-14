import ScrollUtil from '../ScrollUtil'
import React from 'react'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from 'react-redux'
import { storeFactory } from '../../../utils/testHelpers'
import { getFeedPaginated } from '../../../redux-store-2.0/api/tweets'
import { getFeedIds } from '../../../redux-store-2.0/composite-data/selectors'
import { homeKey } from '../../../redux-store-2.0/utils/compositeDataStateKeys'
import InfiniteScroll from 'react-infinite-scroll-component'
import {LOADED} from '../../../redux-store-2.0/constants'

// jest.mock('react-infinite-scroll-component', () => {
//     const actualInfiniteScroll = jest.requireActual('react-infinite-scroll-component')
//     return (
//         (props) => new actualInfiniteScroll({...props, scrollThreshold: 0})
//     )
// })
jest.mock('react-infinite-scroll-component')

const fetchMock = jest.spyOn(global, "fetch")

const MockChild = ({id}) => (
    <div data-test='mock-child'>{id}</div>
)

const ScrollUtilProps = {
    getDataFetch: getFeedPaginated, 
    dispatchData: {}, 
    stateSelector: getFeedIds(), 
    take: 2, 
    stateKey: homeKey(), 
}

/**
 * function to render a component
 * @functio setup
 * @param {object} state - Inital state of the component required for setup
 * @returns {object} - object, containing redux store
*/
const setup = async (state = {}, props = {}) => {
    const store = storeFactory(state)
    await act(async () => {
        render(
            <Provider store={store}> 
                <ScrollUtil {...{...ScrollUtilProps, ...props}}>
                    {(ids) => (
                        <div data-test='mock-child-container'>
                            {ids.map(id => <MockChild key={id} id={id}/>)}
                        </div>
                    )}
                </ScrollUtil>
            </Provider>,
            container
        )
    })
    return {store}
}

let container = null;
beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules();
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);

    //default implementation of InfiniteScroll, can be redefined in test if needed
    //call inifinite scroll always with threshold of 0
    InfiniteScroll.mockImplementation((props) => {
        const actualInfiniteScroll = jest.requireActual('react-infinite-scroll-component')
        return new actualInfiniteScroll({...props, scrollThreshold: 0})
    })
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('no previous composite data in store', () => {
    describe('fetched data amount is less than requested amount', () => {
        test('should fetch tweets on mount once', async () => {
            fetchMock.mockImplementation(() =>
                Promise.resolve({
                    json: () => Promise.resolve({
                        status: 'ok', 
                        tweets: {
                            1: {id: 1},
                            2: {id: 2}
                        },
                        users: {}
                    })
                })
            );

            const initialState = {
                session: {userId: 'test'}
            }
            const {store} = await setup(initialState, {take: 3})
            console.log(store.getState())
        
            // const scrollEvent = new Event('scroll');
            // container.dispatchEvent(scrollEvent);
        
            //expect to render two children because mockfetch returned 2 tweets
            expect(container.querySelector("[data-test='mock-child-container']")?.childElementCount).toBe(2)
            expect(fetchMock.mock.calls.length).toBe(1)
        })
    })
})

test('should not fetch on mount or scroll if all tweets already loaded', async () => {
    fetchMock.mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                status: 'ok', 
                tweets: {
                    1: {id: 1},
                    2: {id: 2}
                },
                users: {}
            })
        })
    );
    const home = homeKey()

    //done is set to true
    const initialState = {
        session: {userId: 'test'},
        compositeData: {
            [home]: {
                entities: [{id: 3}],
                fetchStatus: LOADED,
                lastTopFetchTimestamp: Date.now(),
                error: null,
                done: true
            }
        }
    }
    await setup(initialState, {take: 3})

    const scrollEvent = new Event('scroll');
    container.dispatchEvent(scrollEvent);

    //expect to render one child because initially in state only one entity
    expect(container.querySelector("[data-test='mock-child-container']")?.childElementCount).toBe(1)
    expect(fetchMock.mock.calls.length).toBe(0)
})
