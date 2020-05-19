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
import { LOADED, PENDING_UPDATE, ERROR } from '../../../redux-store-2.0/constants'
import { COMPOSITE_DATA_ENTITIES_FETCH_ERROR } from '../../../redux-store-2.0/action-types'

jest.mock('react-infinite-scroll-component')
const fetchMock = jest.spyOn(global, "fetch")

const events = {}
const home = homeKey()

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
                            {ids.map(id => <MockChild key={Math.random()} id={id}/>)}
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

    //we need this mock because dom events are not supported, only synthetic react events
    window.addEventListener = jest.fn((event, cb) => {
        events[event] = cb;
    })
    //default implementation of InfiniteScroll, can be redefined in test if needed
    //call inifinite scroll always with threshold of 0
    InfiniteScroll.mockImplementation((props) => {
        const actualInfiniteScroll = jest.requireActual('react-infinite-scroll-component')
        return new actualInfiniteScroll({...props, scrollThreshold: 0})
    })

    //default fetch mock implementation that returns 2 entities, can be redefined in test if needed
    fetchMock.mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({
                status: 'ok', 
                tweets: {
                    100: {id: 100},
                    200: {id: 200}
                },
                users: {}
            })
        })
    );
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('no previous composite data in store', () => {
    const initialState = {
        session: {userId: 'test'}
    }

    test('should fetch data on mount once and then on scroll', async () => {
        await setup(initialState, {take: 2})
        await act(async () => {
            events.scroll()
        })    
        //expect to render 4 children because mockfetch returns 2 entities and we did two fetches
        expect(container.querySelector("[data-test='mock-child-container']")?.childElementCount).toBe(4)
        expect(fetchMock.mock.calls.length).toBe(2)
    })
})

describe('little composite data in store - not enough to make scroll', () => {
    describe('all tweets are already loaded - done is set to true', () => {
        const initialState = {
            session: {userId: 'test'},
            compositeData: {
                [home]: {
                    entities: [{id: 0}],
                    fetchStatus: LOADED,
                    lastTopFetchTimestamp: Date.now(),
                    error: null,
                    done: true
                }
            }
        }
        test('should not fetch on mount or scroll', async () => {
            await setup(initialState, {take: 2})
        
            await act(async () => {
                events.scroll()
            })
        
            //expect to render one child because initially in state only one entity
            expect(container.querySelector("[data-test='mock-child-container']")?.childElementCount).toBe(1)
            expect(fetchMock.mock.calls.length).toBe(0)
        })
    })
    describe('not all tweets are loaded - done is set to false', () => {
        //fetchStatus shoul be PENDING_UPDATE
        const initialState = {
            session: {userId: 'test'},
            compositeData: {
                [home]: {
                    entities: [{id: 0}],
                    fetchStatus: PENDING_UPDATE,
                    lastTopFetchTimestamp: Date.now(),
                    error: null,
                    done: false
                }
            }
        }
        test('should fetch data on mount and on scroll', async () => {
            //fetch on mount
            await setup(initialState, {take: 2})

            //fetch on scroll
            await act(async () => {
                events.scroll()
            })
            //expect to render 5 children because we have 1 in initialState plus 4 from 2 fetches
            expect(container.querySelector("[data-test='mock-child-container']")?.childElementCount).toBe(5)
            expect(fetchMock.mock.calls.length).toBe(2)
        })
    })
})

describe('a lot of composite data already loaded in store', () => {
    describe('not all tweets are loaded - done is set to false', () => {
        //there are enought entities that user can make scroll
        const entitiesLength = 20
        const initialState = {
            session: {userId: 'test'},
            compositeData: {
                [home]: {
                    entities: Array.from(Array(entitiesLength), (x, i) => ({id: i})),
                    fetchStatus: LOADED,
                    lastTopFetchTimestamp: Date.now(),
                    error: null,
                    done: false
                }
            }
        }

        test('should not fetch data on mount', async () => {
            await setup(initialState, {take: 2})
        
            //expect to render entitiesLength children 
            expect(container.querySelector("[data-test='mock-child-container']")?.childElementCount).toBe(entitiesLength)
            expect(fetchMock.mock.calls.length).toBe(0)
        })
        test('should fetch data on scroll', async () => {
            await setup(initialState, {take: 2})
        
            await act(async () => {
                events.scroll()
            })
        
            //expect to entitiesLength + 2 because we have entitiesLength in initialState plus 2 from fetch
            expect(container.querySelector("[data-test='mock-child-container']")?.childElementCount).toBe(entitiesLength + 2)
            expect(fetchMock.mock.calls.length).toBe(1)
        })
        test('should NOT fetch data on scroll if server did not return any entities', async () => {
            //no entities mean that we already got all of them in previous fetch
            fetchMock.mockImplementation(() =>
                Promise.resolve({
                    json: () => Promise.resolve({
                        status: 'ok', 
                        tweets: {},
                        users: {}
                    })
                })
            )
            await setup(initialState, {take: 2})   

            //make scroll to fetch some data, but will receive no new data
            await act(async () => {
                events.scroll()
            })
        
            await act(async () => {
                events.scroll()
            })
        
            //expect entitiesLength because we have entitiesLength in initialState and we did not get any new data
            expect(container.querySelector("[data-test='mock-child-container']")?.childElementCount).toBe(entitiesLength)

            //second fetch on scroll should not be made because we know that there no more data to fetch
            expect(fetchMock.mock.calls.length).toBe(1)
        })
        test('should NOT fetch data on scroll if server returned less entities than requested', async () => {
            //no entities mean that we already got all of them in previous fetch
            fetchMock.mockImplementation(() =>
                Promise.resolve({
                    json: () => Promise.resolve({
                        status: 'ok', 
                        tweets: {111: {id: 111}},
                        users: {}
                    })
                })
            )
            await setup(initialState, {take: 2}) 

            //make scroll to fetch some data, will receive less than requested
            await act(async () => {
                events.scroll()
            })
        
            await act(async () => {
                events.scroll()
            })
        
            //expect entitiesLength + 1 because we have entitiesLength in initialState and received one new
            expect(container.querySelector("[data-test='mock-child-container']")?.childElementCount).toBe(entitiesLength + 1)

            //second fetch on scroll should not be made because we know that there no more data to fetch
            expect(fetchMock.mock.calls.length).toBe(1)
        })
        test('should NOT fetch data on scroll if server responded with error', async () => {
            //server responded with error
            fetchMock.mockImplementation(() =>
                Promise.resolve({
                    json: () => Promise.resolve({
                        status: 'error', 
                        error: 'some error'
                    })
                })
            )
        
            await setup(initialState, {take: 2})
        
            //make scroll to fetch some data, but will receive error
            await act(async () => {
                events.scroll()
            })
        
            await act(async () => {
                events.scroll()
            })
        
            //expect entitiesLength because we have entitiesLength in initialState 
            expect(container.querySelector("[data-test='mock-child-container']")?.childElementCount).toBe(entitiesLength)
            //second fetch on scroll should not be made because of an error, so we expect only 1
            expect(fetchMock.mock.calls.length).toBe(1)
        })
    })
})


test('should NOT fetch data on scroll or mount if there was previously an error', async () => {
    const home = homeKey()
    const globalErrorKey = `${COMPOSITE_DATA_ENTITIES_FETCH_ERROR}/${homeKey()}`
    //done is set to false
    const initialState = {
        session: {userId: 'test'},
        compositeData: {
            [home]: {
                entities: [{id: 0}],
                fetchStatus: ERROR,
                lastTopFetchTimestamp: Date.now(),
                error: 'someError',
                done: false
            }
        },
        errors: {[globalErrorKey]: 'someError'}
    }
    await setup(initialState, {take: 2})

    await act(async () => {
        events.scroll()
    })

    //expect 1 because we have 1 in initialState 
    expect(container.querySelector("[data-test='mock-child-container']")?.childElementCount).toBe(1)
    expect(fetchMock.mock.calls.length).toBe(0)
})

