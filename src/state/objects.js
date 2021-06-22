/**
 * @todo Maybe store items as a dictionary by default
 */
import * as L from 'partial.lenses';
import { createSlice, original } from '@reduxjs/toolkit';

import { createPrefixedActionCreator } from 'common/util';

const name = 'objects';
const createAction = createPrefixedActionCreator(name);

//

export const addObject = createAction('addObject');
export const addObjects = createAction('addObjects');
export const setObjects = createAction('setObjects');
export const updateObject = createAction('updateObject');
export const deleteObject = createAction('deleteObject');

//

const initialState = {
  entities: [],
};

//

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(addObject, (s, a) =>
        L.set(['entities', L.appendTo], a.payload, original(s)),
      )
      .addCase(addObjects, (s, a) =>
        L.modify('entities', xs => xs.concat(a.payload), original(s)),
      )
      .addCase(setObjects, (s, a) => L.set('entities', a.payload, original(s)))
      .addCase(updateObject, (s, a) =>
        L.modify(
          ['entities', L.find(o => o.id === a.payload.id)],
          o => Object.assign({}, o, a.payload),
          original(s),
        ),
      )
      .addCase(deleteObject, (s, a) =>
        L.remove(['entities', L.find(o => o.id === a.payload.id)], original(s)),
      ),
});

const reducer = slice.reducer;

export default reducer;
