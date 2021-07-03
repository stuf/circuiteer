import * as L from 'partial.lenses';
import * as R from 'ramda';
import { createSlice, original } from '@reduxjs/toolkit';

import { createPrefixedActionCreator } from 'common/util';
import { stateL, StateL, gridSizeL, guideLayerL, visibleL } from './lenses/app';

//

const name = 'app';
const createAction = createPrefixedActionCreator(name);

const initialState = {
  menu: {
    visible: false,
  },
  guideLayer: {
    visible: false,
  },
  grid: {
    visible: false,
    size: {
      width: null,
      height: null,
    },
  },
};

//

export const toggleMenu = createAction('toggleMenu');
export const toggleGuideLayer = createAction('toggleGuideLayer');
export const setGridSize = createAction('setGridSize');

//

const handleAction = fn => (s, a = {}) => fn(original(s), a.payload);

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(toggleMenu, handleAction(L.modify(StateL.menuVisible, R.not)))
      .addCase(
        setGridSize,
        handleAction((s, p) => L.set(StateL.gridSize, p, s)),
      )
      .addCase(
        toggleGuideLayer,
        handleAction(L.modify([StateL.guideLayerVisible], R.not)),
      )
      .addDefaultCase(s => L.get(stateL, original(s))),
});

const reducer = slice.reducer;

export default reducer;
