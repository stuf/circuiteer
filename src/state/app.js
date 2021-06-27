import * as L from 'partial.lenses';
import * as R from 'ramda';
import { createSlice, original } from '@reduxjs/toolkit';

import { createPrefixedActionCreator } from 'common/util';

//

const name = 'app';
const createAction = createPrefixedActionCreator(name);

const initialState = {
  menu: {
    visible: false,
  },
};

//

export const toggleMenu = createAction('toggleMenu');

//

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(toggleMenu, s =>
      L.modify(['menu', 'visible'], R.not, original(s)),
    ),
});

const reducer = slice.reducer;

export default reducer;
