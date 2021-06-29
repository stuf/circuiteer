import * as L from 'partial.lenses';
import { createSlice, original } from '@reduxjs/toolkit';

import { createPrefixedActionCreator } from 'common/util';

const name = 'tier';
const createAction = createPrefixedActionCreator(name);

const initialState = {
  tiers: [],
  current: 1,
};

const stateL = L.pickIn({
  tiers: L.define([]),
  current: L.define(null),
});

//

export const setTiers = createAction('setTiers');
export const setCurrentTier = createAction('setCurrentTier');

//

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(setTiers, (s, a) =>
        L.set([stateL, 'tiers'], a.payload, original(s)),
      )
      .addCase(setCurrentTier, (s, a) =>
        L.set([stateL, 'current', L.rewrite(v => +v)], a.payload, original(s)),
      ),
});

const reducer = slice.reducer;

export default reducer;
