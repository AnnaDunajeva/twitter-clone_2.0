import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './redux-store-2.0/reducer'
import middleware from './redux-store-2.0/middleware/index'
import {BrowserRouter as Router} from 'react-router-dom'

const store = createStore(reducer, middleware)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, 
document.getElementById('root'));

