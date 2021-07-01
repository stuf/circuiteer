import * as R from 'ramda';
import * as L from 'partial.lenses';
import { createSlice, original } from '@reduxjs/toolkit';

import { createPrefixedActionCreator } from 'common/util';
import { stateL, entitiesL } from './lenses/game-entities';

const name = 'gameEntities';
const createAction = createPrefixedActionCreator(name);

//

export const setGameObjects = createAction('setGameObjects');
export const addGameObject = createAction('addGameObject');
export const updateGameObject = createAction('updateGameObject');
export const deleteGameObject = createAction('deleteGameObject');

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
      .addCase(setGameObjects, (s, a) =>
        L.set([stateL, entitiesL], a.payload, original(s)),
      )

      // These are most likely only needed for admin-ish stuff
      .addCase(addGameObject, (s, a) =>
        L.set([stateL, entitiesL, L.appendTo], a.payload, original(s)),
      )

      // Update works as upsert by design
      .addCase(updateGameObject, (s, a) =>
        L.modify(
          [stateL, entitiesL, L.find(o => o.id === a.payload.id)],
          R.flip(R.merge)(a.payload),
          original(s),
        ),
      )
      .addCase(deleteGameObject, (s, a) =>
        L.remove(
          [stateL, entitiesL, L.find(o => o.id === a.payload.id)],
          original(s),
        ),
      )
      .addDefaultCase(s => L.get(stateL, original(s))),
});

const reducer = slice.reducer;

export default reducer;
