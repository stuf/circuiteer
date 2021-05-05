import * as L from 'partial.lenses';

import { createAction, createSlice, original } from '@reduxjs/toolkit';

const name = 'location';
const prefix = x => [name, x].join('/');

//

export const changeLocation = createAction(prefix('changeLocation'));

//

const initialState = {
  locations: [{ id: 1, name: 'firstPlanet', displayName: 'First Planet' }],
  current: 1,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(changeLocation, (s, a) =>
      L.set('current', a.payload, original(s)),
    );
  },
});

export default slice.reducer;

//

/**
 * @typedef {object} Location
 * @prop {number} id
 * @prop {string} name
 * @prop {string} displayName
 */
