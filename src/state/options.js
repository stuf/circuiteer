import * as L from 'partial.lenses';
import { createSlice, original } from '@reduxjs/toolkit';

import { createPrefixedActionCreator } from 'common/util';

const name = 'options';
const createAction = createPrefixedActionCreator(name);

const initialState = {
  flags: {},
};

//

export const toggleFlag = createAction('toggleFlag');
export const setFlag = createAction('setFlag');
export const setFlags = createAction('setFlags');

//

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(toggleFlag, (s, a) =>
        L.modify(['flags', a.payload], x => !x, original(s)),
      )
      .addCase(setFlag, (s, a) =>
        L.set(['flags', a.payload.flag], a.payload.value, original(s)),
      )
      .addCase(setFlags, (s, a) => L.assign('flags', a.payload, original(s))),
});

const reducer = slice.reducer;

export default reducer;
