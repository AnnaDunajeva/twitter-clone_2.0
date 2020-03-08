import { combineReducers } from "redux"
import tweets from './tweets/reducer'
import users from './users/reducer'

export default combineReducers({
    tweets,
    users
})

// import { combineReducers } from "redux"
// import { createTweetsEntities } from './entities/tweets/reducer'
// import { createUsersEntities } from './entities/users/reducer'
// import { createErrors } from './errors/reducer'
// import { createFetchStatus } from './fetchStatus/reducer'

// const createTweetsEntity = () => {
//     return combineReducers({
//         entities: createTweetsEntities(),
//         errors: createErrors(),
//         fetchStatus: createFetchStatus()
//     })
// }

// const createUsersEntity = () => {
//     return combineReducers({
//         entities: createUsersEntities(),
//         errors: createErrors(),
//         fetchStatus: createFetchStatus()
//     })
// }

// export default combineReducers({
//     tweets: createTweetsEntity(),
//     users: createUsersEntity()
// })