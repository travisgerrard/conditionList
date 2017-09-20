import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { setCurrentUser } from './actions/authActions';

import registerServiceWorker from './registerServiceWorker';

var jwtDecode = require('jwt-decode')

const store = createStore(
  rootReducer,
  composeWithDevTools (
    applyMiddleware(thunk)
  )
);

if (localStorage.jwtToken) {
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
