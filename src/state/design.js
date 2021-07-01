import * as L from 'partial.lenses';
import { createSlice, original } from '@reduxjs/toolkit';
import { createPrefixedActionCreator } from 'common/util';

import { stateL } from './lenses/design';

const name = 'design';
const createAction = createPrefixedActionCreator(name);

//

const initialState = {
  name: null,
};

//

export const setName = createAction('setName');

//

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(setName, (s, a) =>
      L.set([stateL, 'name'], a.payload, original(s)),
    ),
});

const reducer = slice.reducer;

//

export default reducer;
