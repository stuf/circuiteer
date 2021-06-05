import * as R from 'ramda';
import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render as renderRtl } from '@testing-library/react';
import { format } from 'util';
import { Provider } from 'react-redux';
import { preloadedState } from './core/preloaded';
import * as reducers from './state';
import { configureStore } from '@reduxjs/toolkit';

import './test/index';

//

export function wrapper(props) {
  const store = configureStore({ preloadedState, reducer: reducers });
  return <Provider store={store}>{props.children}</Provider>;
}

export function render(
  vdom,
  { router = {}, initialState, store, ...renderOptions } = {},
) {
  const rootStore =
    store ||
    configureStore({
      preloadedState: initialState || preloadedState,
      reducer: reducers,
    });

  function Wrapper({ children }) {
    let MaybeRouter = Fragment;
    let maybeRouterProps = {};

    if (!R.isEmpty(router)) {
      MaybeRouter = BrowserRouter;
      const { route } = router;
      if (route) {
        window.history.pushState({}, 'title', route);
      }
      maybeRouterProps = {};
    }

    return (
      <Provider store={rootStore}>
        <MaybeRouter {...maybeRouterProps}>{children}</MaybeRouter>
      </Provider>
    );
  }

  return renderRtl(vdom, { wrapper: Wrapper, ...renderOptions });
}

//

export function suppressPropTypeWarnings() {
  const err = console.error.bind(console.error);

  beforeAll(() => {
    console.error = (msg, ...rest) => {
      const errorMsg = format(msg, ...rest);
      if (!errorMsg.toString().includes('Warning: Failed prop type')) {
        err(errorMsg);
      }
    };
  });

  afterAll(() => {
    console.error = err;
  });
}
