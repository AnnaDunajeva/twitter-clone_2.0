import React from 'react'
import {Route, Redirect} from 'react-router-dom'


const PrivateRoute = ({ component: Component, computedMatch, path, additionalProps, ...rest }) => {

  console.log('rendering route', path)
  
  if (path === '/tweet/:id') {
    return <Route computedMatch={computedMatch} {...rest} render={(props) => (
      localStorage.getItem('userId')
        ? <Component {...props} {...additionalProps || null} key={computedMatch.params.id}/> //key change will allow component to remount when we change from one tweet page to other
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  }
  if (path === '/user/:userId') {
    return <Route computedMatch={computedMatch} {...rest} render={(props) => (
      localStorage.getItem('userId')
        ? <Component {...props} {...additionalProps || null} key={computedMatch.params.userId}/> //key change will allow component to remount when we change from one user page to other
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  }
  return <Route computedMatch={computedMatch} {...rest} render={(props) => (
    localStorage.getItem('userId')
      ? <Component {...props} {...additionalProps || null}/> 
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