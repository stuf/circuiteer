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
export const lockObject = createAction('lockObject');
export const unlockObject = createAction('unlockObject');
export const enableObject = createAction('enableObject');
export const disableObject = createAction('disableObject');
export const toggleObject = createAction('toggleObject');

//

const findObjectL = id => ['entities', L.find(o => o.id === id)];

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
        L.set(['entities', L.appendTo], a.payload, original(s)),
      )
      .addCase(addObjects, (s, a) =>
        L.modify('entities', xs => xs.concat(a.payload), original(s)),
      )
      .addCase(setObjects, (s, a) =>
        L.set(
          ['entities'],
          L.collect([L.elems, normalizeObjectL], a.payload),
          original(s),
        ),
      )
      .addCase(updateObject, (s, a) =>
        L.modify(
          findObjectL(a.payload.id),
          o => Object.assign({}, o, a.payload),
          original(s),
        ),
      )
      .addCase(deleteObject, (s, a) =>
        L.remove(findObjectL(a.payload.id), original(s)),
      )
      .addCase(lockObject, (s, a) =>
        L.set([findObjectL(a.payload.id), 'locked'], true, original(s)),
      )
      .addCase(unlockObject, (s, a) =>
        L.set([findObjectL(a.payload.id), 'locked'], false, original(s)),
      )
      .addCase(enableObject, (s, a) =>
        L.remove([findObjectL(a.payload.id), 'disabled'], original(s)),
      )
      .addCase(disableObject, (s, a) =>
        L.set([findObjectL(a.payload.id), 'disabled'], true, original(s)),
      ),
});

const reducer = slice.reducer;

export default reducer;
