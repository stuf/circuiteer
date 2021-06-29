import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import { store } from './store';
import 'normalize.css';
import './styles/index.scss';
import { getLogger } from 'common/logger';

// Bootstrap
import './core';

const logger = getLogger('main');

logger.log('info', 'entry point init');

render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
