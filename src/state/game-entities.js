import * as L from 'partial.lenses';
import { createSlice, original } from '@reduxjs/toolkit';

import { createPrefixedActionCreator } from 'common/util';

const name = 'gameEntities';
const createAction = createPrefixedActionCreator(name);

//

function normalize(items) {
  const ids = L.collect([L.elems, 'id'], items);
  const entities = L.modify(L.entries, ([k, v]) => [v.id, v], items);

  return {
    ids,
    entities,
  };
}

//

export const setGameObjects = createAction('setGameObjects');

//

const initialState = {
  ids: [],
  entities: {},
  objects: [],
};

//

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(setGameObjects, (s, a) =>
      L.set(L.props('ids', 'entities'), normalize(a.payload), original(s)),
    ),
});

const reducer = slice.reducer;

export default reducer;
