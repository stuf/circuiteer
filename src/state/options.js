import * as L from 'partial.lenses';
import * as R from 'ramda';
import { createSlice, original } from '@reduxjs/toolkit';

import { createPrefixedAction } from 'common/util';

const name = 'options';
const createAction = createPrefixedAction(name);

//

export const togglePowerStatus = createAction('togglePowerStatus');

export const toggleHideInvalid = createAction('toggleHideInvalid');

export const toggleEntityEditor = createAction('toggleEntityEditor');

export const toggleShoppingList = createAction('toggleShoppingList');

export const toggleEfficiencyAsMultiplier = createAction(
  'toggleEfficiencyAsMultiplier',
);

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
    showEfficiencyAsMultiplier: false,
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
      .addCase(toggleShoppingList, toggle('showShoppingList'))
      .addCase(
        toggleEfficiencyAsMultiplier,
        toggle('showEfficiencyAsMultiplier'),
      );
  },
});

export default slice.reducer;
