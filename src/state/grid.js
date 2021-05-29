import * as R from 'ramda';
import * as L from 'partial.lenses';
import { createSlice, original } from '@reduxjs/toolkit';

import { createPrefixedAction } from 'common/util';

const name = 'grid';

const createAction = createPrefixedAction(name);

//

export const setGridSize = createAction('setGridSize');

export const toggleGrid = createAction('toggleGrid');

//

/**
 * @type {App.State.Grid}
 */
const initialState = {
  size: [32, 32],
  show: true,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(setGridSize, (s, a) => L.set('size', a.payload, original(s)))
      .addCase(toggleGrid, s => L.modify('show', R.not, original(s))),
});

export default slice.reducer;
