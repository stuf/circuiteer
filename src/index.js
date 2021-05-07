import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Splash from './Splash';
import reportWebVitals from './reportWebVitals';
import store from './store';

function Root() {
  return (
    <Provider {...{ store }}>
      <Router>
        <Switch>
          <Route path="/editor">
            <App />
          </Route>
          <Route>
            <Splash />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
