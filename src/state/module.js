import * as L from 'partial.lenses';
import { createAction, createSlice } from '@reduxjs/toolkit';

import { modules } from '../config';

const name = 'module';
const prefix = x => [name, x].join('/');

//

export const setModules = createAction(prefix('setModules'));

//

const init = {
  modules,
};

const initialState = {
  modules,
  tier: Object.values(modules).reduce(
    (o, module) => L.set([`${module.tier}`, L.appendTo], module, o),
    {},
  ),
};

//

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  // extraReducers: builder => {},
});

export default slice.reducer;
