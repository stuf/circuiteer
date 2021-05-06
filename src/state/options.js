import * as L from 'partial.lenses';
import * as R from 'ramda';
import { createAction, createSlice, original } from '@reduxjs/toolkit';

const name = 'options';
const prefix = x => [name, x].join('/');

//

export const togglePowerStatus = createAction(prefix('togglePowerStatus'));

export const toggleHideInvalid = createAction(prefix('toggleHideInvalid'));

export const toggleEntityEditor = createAction(prefix('toggleEntityEditor'));

//

const initialState = {
  flags: {
    hideInvalid: false,
    showPowerStatus: true,
    showEditor: true,
  },
};

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(togglePowerStatus, s =>
        L.modify(['flags', 'showPowerStatus'], R.not, original(s)),
      )
      .addCase(toggleHideInvalid, s =>
        L.modify(['flags', 'hideInvalid'], R.not, original(s)),
      )
      .addCase(toggleEntityEditor, s =>
        L.modify(['flags', 'showEditor'], R.not, original(s)),
      );
  },
});

export default slice.reducer;
