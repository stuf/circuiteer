import * as L from 'partial.lenses';
import { createAction, createReducer } from '@reduxjs/toolkit';

export const setGridSize = createAction('setGridSize');

//

const reducer = createReducer(
  {
    size: [32, 32],
  },
  {
    [setGridSize]: (s, a) => L.set('size', a.payload, s),
  },
);

export default reducer;
