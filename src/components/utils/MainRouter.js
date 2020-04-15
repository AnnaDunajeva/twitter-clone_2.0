import React, { Component } from 'react'
import {Router} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import ModalCheck from './modal-check';

const customHistory = createBrowserHistory();
const prevHistoryPush = customHistory.push;
let lastLocation = customHistory.location;

customHistory.listen(location => {
  lastLocation = location;
});
customHistory.push = (pathname, state = {}) => {
  if (
    lastLocation === null ||
    pathname !==
      lastLocation.pathname + lastLocation.search + lastLocation.hash ||
    JSON.stringify(state) !== JSON.stringify(lastLocation.state)
  ) {
    prevHistoryPush(pathname, state);
  }
};

class MainRouter extends Component {
  render () {
    return (
      <Router history={customHistory}>
        <ModalCheck {...props} store={this.props.store} />
      </Router>
    )
  }
}

export default MainRouter;