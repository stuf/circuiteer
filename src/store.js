import { configureStore } from '@reduxjs/toolkit';

import { preloadedState } from './core/preloaded';
import * as reducers from './state';

const store = configureStore({ preloadedState, reducer: reducers });

export default store;
