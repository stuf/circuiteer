import * as L from 'partial.lenses';
import * as R from 'ramda';
import { createAction, createSlice, original } from '@reduxjs/toolkit';

const name = 'options';
const prefix = x => [name, x].join('/');

//

export const togglePowerStatus = createAction(prefix('togglePowerStatus'));

export const toggleHideInvalid = createAction(prefix('toggleHideInvalid'));

export const toggleEntityEditor = createAction(prefix('toggleEntityEditor'));

export const toggleShoppingList = createAction(prefix('toggleShoppingList'));

//

const toggle = f => R.compose(L.modify(['flags', f], R.not), original);

/**
 * @type {App.State.Options}
 */
const initialState = {
  flags: {
    hideInvalid: false,
    showPowerStatus: true,
    showEditor: true,
    showShoppingList: true,
  },
};

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(togglePowerStatus, toggle('showPowerStatus'))
      .addCase(toggleHideInvalid, toggle('hideInvalid'))
      .addCase(toggleEntityEditor, toggle('showEditor'))
      .addCase(toggleShoppingList, toggle('showShoppingList'));
  },
});

export default slice.reducer;
