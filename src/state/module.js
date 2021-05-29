import { createSlice } from '@reduxjs/toolkit';
import { createPrefixedAction } from 'common/util';

import { modules } from '../config';

const name = 'module';
const createAction = createPrefixedAction(name);

//

console.log({ modules });

export const setModules = createAction('setModules');

//

export const initialState = {
  modules,
};

//

const slice = createSlice({
  name,
  initialState,
  reducers: {},
});

export default slice.reducer;
