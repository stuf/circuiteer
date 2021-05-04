import { configureStore } from '@reduxjs/toolkit';

import * as reducers from './state';

const store = configureStore({ reducer: reducers });

export default store;
