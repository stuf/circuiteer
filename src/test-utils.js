import { render as renderRtl } from '@testing-library/react';
import { format } from 'util';
import { Provider } from 'react-redux';
import { preloadedState } from './core/preloaded';
import * as reducers from './state';
import { configureStore } from '@reduxjs/toolkit';

import './test/index';

//

export function render(vdom, { initialState, store, ...renderOptions } = {}) {
  const rootStore =
    store ||
    configureStore({
      preloadedState: initialState || preloadedState,
      reducer: reducers,
    });

  function Wrapper({ children }) {
    return <Provider store={rootStore}>{children}</Provider>;
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
