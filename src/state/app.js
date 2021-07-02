import * as L from 'partial.lenses';
import * as R from 'ramda';
import { createSlice, original } from '@reduxjs/toolkit';

import { createPrefixedActionCreator } from 'common/util';
import { stateL, gridSizeL, guideLayerL, visibleL } from './lenses/app';

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
      .addCase(
        toggleMenu,
        handleAction(L.modify([stateL, 'menu', 'visible'], R.not)),
      )
      .addCase(
        setGridSize,
        handleAction((s, p) => L.set(gridSizeL, p, s)),
      )
      .addCase(
        toggleGuideLayer,
        handleAction(L.modify([guideLayerL, visibleL], R.not)),
      )
      .addDefaultCase(s => L.get(stateL, original(s))),
});

const reducer = slice.reducer;

export default reducer;
