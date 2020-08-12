import React from 'react'
import {useSelector} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import {getAuthedUserId} from '../../redux-store-2.0/session/selectors'

const PrivateRoute = ({ 
  component: Component, 
  computedMatch, 
  path, 
  additionalProps, 
  ...rest 
}) => {
  const authedUser = useSelector(getAuthedUserId())
  
  //this seems like i can remove, works now fine
  if (path === '/tweet/:id') {
    return <Route computedMatch={computedMatch} {...rest} render={(props) => (
      authedUser
        ? <Component {...props} {...additionalProps || null} key={computedMatch.params.id}/> //key change will allow component to remount when we change from one tweet page to other
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  }

  if (path === '/user/:userId') {
    return <Route computedMatch={computedMatch} {...rest} render={(props) => {
      return authedUser
        ? <Component key={computedMatch.params.userId} {...props} {...additionalProps || null}/> //key change will allow component to remount when we change from one user page to other
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    }} />
  }

  if (path === '/find/:userId') {
    return <Route computedMatch={computedMatch} {...rest} render={(props) => (
      authedUser
        ? <Component {...props} {...additionalProps || null} key={computedMatch.params.userId}/> //key change will allow component to remount when we change from one search result to other
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  }

  return <Route computedMatch={computedMatch} {...rest} render={(props) => (
    authedUser
      ? <Component {...props} {...additionalProps || null}/> 
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
}

export default PrivateRoute