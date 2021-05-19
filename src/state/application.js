import * as L from 'partial.lenses';
import * as R from 'ramda';
import { createAction, createSlice, original } from '@reduxjs/toolkit';

const name = 'application';
const prefix = x => [name, x].join('/');

//

export const toggleSplashScreen = createAction(prefix('toggleSplashScreen'));

//

/**
 * @type {import('./application').IState}
 */
const initialState = {
  splash: {
    delay: 1000,
    show: true,
  },
};

//

/**
 * @type {import('./application').ThisSlice}
 */
const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(toggleSplashScreen, s =>
      L.modify(['splash', 'show'], R.not, original(s)),
    );
  },
});

//

export const reducer = slice.reducer;

export default slice.reducer;

//

/**
 * @typedef {object} State
 * @prop {ISplash} splash
 */

/**
 * @typedef {object} ISplash
 * @prop {number} delay
 * @prop {boolean} show
 */
