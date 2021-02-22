import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { rootReducer } from './redux/rootReducer';
import { CookiesProvider } from 'react-cookie';
const store = createStore(
  rootReducer, applyMiddleware(thunk)
);
hydrate(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
);
