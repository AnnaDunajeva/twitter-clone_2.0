import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reducer from './redux-store/reducers/index'
import {createStore} from 'redux'
import middleware from './redux-store/middleware/index';
import {Provider} from 'react-redux'

const store = createStore(reducer, middleware)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
document.getElementById('root'));

