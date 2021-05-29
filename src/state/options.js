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

export const toggleMaterialRequirementBreakdown = createAction(
  'toggleMaterialRequirementBreakdown',
);

export const toggleFlag = createAction('toggleFlag');

export const toggleOptionsModal = createAction('toggleOptionsModal');

//

const toggle = f => R.compose(L.modify(['flags', f], R.not), original);

/**
 * @type {App.State.Options}
 */
const initialState = {
  displayModal: false,
  flags: {
    hideInvalid: false,
    showPowerStatus: true,
    showEditor: true,
    showShoppingList: true,
    showEfficiencyAsMultiplier: false,
    materialRequirementBreakdown: false,
  },
};

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(toggleOptionsModal, s => {
        s.displayModal = !s.displayModal;
      })
      .addCase(togglePowerStatus, toggle('showPowerStatus'))
      .addCase(toggleHideInvalid, toggle('hideInvalid'))
      .addCase(toggleEntityEditor, toggle('showEditor'))
      .addCase(toggleShoppingList, toggle('showShoppingList'))
      .addCase(
        toggleMaterialRequirementBreakdown,
        toggle('materialRequirementBreakdown'),
      )
      .addCase(
        toggleEfficiencyAsMultiplier,
        toggle('showEfficiencyAsMultiplier'),
      )
      .addCase(toggleFlag, (s, a) => {
        s.flags[a.payload] = !s.flags[a.payload];
      });
  },
});

export default slice.reducer;
