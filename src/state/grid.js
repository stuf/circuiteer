import * as L from 'partial.lenses';
import { createAction, createSlice, original } from '@reduxjs/toolkit';

const name = 'grid';
const prefix = x => [name, x].join('/');

//

export const setGridSize = createAction(prefix('setGridSize'));

//

/**
 * @type {App.State.Grid}
 */
const initialState = {
  size: [32, 32],
};

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(setGridSize, (s, a) =>
      L.set('size', a.payload, original(s)),
    ),
});

export default slice.reducer;
