import React from 'react'
import {Route, Redirect} from 'react-router-dom'


const PrivateRoute = ({ component: Component, computedMatch, path, ...rest }) => {
  console.log('rendering route', path)
  // if (path === '/') {
  //   const asyncDispatch = async() =>{
  //     await dispatch(deleteAllTweets())

  //   }
  //   asyncDispatch()
  // }
  if (path === '/tweet/:id') {
    return <Route computedMatch={computedMatch} {...rest} render={(props) => (
      localStorage.getItem('userId')
        ? <Component {...props} key={computedMatch.params.id}/> //key change will allow component to remount when we change from one tweet page to other
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  }
  return <Route computedMatch={computedMatch} {...rest} render={(props) => (
    localStorage.getItem('userId')
      ? <Component {...props} /> //
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
}

export default PrivateRoute

// export default function PrivateRoute({ children, ...rest }) {
//   console.log({ children, ...rest })
//     return (
//       <Route {...rest} render={({ location }) =>
//         localStorage.getItem('userId') ? (
//             children
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { from: location }
//               }}
//             />
//           )
//         }
//       />
//     );
// }