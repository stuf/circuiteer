import * as L from 'partial.lenses';
import { createSlice, original } from '@reduxjs/toolkit';

import { createPrefixedActionCreator } from 'common/util';

const name = 'gameEntities';
const createAction = createPrefixedActionCreator(name);

//

export const setGameObjects = createAction('setGameObjects');

//

const initialState = {
  entities: [],
};

const entitiesL = ['entities', L.define([])];

//

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(setGameObjects, (s, a) =>
      L.set(entitiesL, a.payload, original(s)),
    ),
});

const reducer = slice.reducer;

export default reducer;
