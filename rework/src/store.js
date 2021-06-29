import { configureStore } from '@reduxjs/toolkit';

import * as reducer from './state';

export const store = configureStore({
  reducer,
});

export default store;
