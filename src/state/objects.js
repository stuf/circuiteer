/**
 * @todo Maybe store items as a dictionary by default
 */
import * as L from 'partial.lenses';
import { createSlice, original } from '@reduxjs/toolkit';

import { createPrefixedActionCreator } from 'common/util';
import { stateL, objectL, findObjectL } from './lenses/objects';

const name = 'objects';
const createAction = createPrefixedActionCreator(name);

//

export const addObject = createAction('addObject');
export const addObjects = createAction('addObjects');
export const setObjects = createAction('setObjects');
export const updateObject = createAction('updateObject');
export const deleteObject = createAction('deleteObject');
export const lockObject = createAction('lockObject');
export const unlockObject = createAction('unlockObject');
export const enableObject = createAction('enableObject');
export const disableObject = createAction('disableObject');
export const toggleObject = createAction('toggleObject');

//

const normalizeObjectL = L.pickIn({
  id: [],
  pos: [],
  size: [],
  entity: [],
  disabled: L.define(false),
  locked: L.define(false),
});

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
        L.set(findObjectL(a.payload.id), a.payload, original(s)),
      )
      .addCase(addObjects, (s, a) =>
        L.modify('entities', xs => xs.concat(a.payload), original(s)),
      )
      .addCase(setObjects, (s, a) => L.set('entities', a.payload, original(s)))
      .addCase(updateObject, (s, a) =>
        L.modify(
          [findObjectL(a.payload.id), L.propsExcept('entity')],
          o => ({ ...o, ...a.payload }),
          original(s),
        ),
      )
      .addCase(deleteObject, (s, a) =>
        L.remove(findObjectL(a.payload.id), original(s)),
      )
      .addCase(lockObject, (s, a) =>
        L.set(
          [findObjectL(a.payload.id), normalizeObjectL, 'locked'],
          true,
          original(s),
        ),
      )
      .addCase(unlockObject, (s, a) =>
        L.set(
          [findObjectL(a.payload.id), normalizeObjectL, 'locked'],
          false,
          original(s),
        ),
      )
      .addCase(enableObject, (s, a) =>
        L.remove(
          [findObjectL(a.payload.id), normalizeObjectL, 'disabled'],
          original(s),
        ),
      )
      .addCase(disableObject, (s, a) =>
        L.set(
          [findObjectL(a.payload.id), normalizeObjectL, 'disabled'],
          true,
          original(s),
        ),
      )
      .addDefaultCase(s => L.get([stateL], original(s))),
});

const reducer = slice.reducer;

export default reducer;
