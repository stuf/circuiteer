import * as L from 'partial.lenses';
import { createSlice, original } from '@reduxjs/toolkit';

import { createPrefixedActionCreator, normalize } from 'common/util';

const name = 'location';
const createAction = createPrefixedActionCreator(name);

//

export const setLocations = createAction('setLocations');
export const setCurrent = createAction('setCurrent');

//

const initialState = {
  ids: [],
  entities: {},
  current: 'calidor',
};

//

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(setLocations, (s, a) =>
        L.set(L.props('ids', 'entities'), normalize(a.payload), original(s)),
      )
      .addCase(setCurrent, (s, a) => L.set('current', a.payload, original(s))),
});

const reducer = slice.reducer;

export default reducer;
