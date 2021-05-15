import * as L from 'partial.lenses';
import * as R from 'ramda';
import { createSlice, original } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { createPrefixedAction } from 'common/util';

//

// eslint-disable-next-line
const entityL = L.pickIn({
  id: L.define(null),
  module: L.define({}),
  pos: L.define([0, 0]),
  enabled: L.define(true),
});

const stateL = L.pickIn({
  dragging: L.define(false),
  entities: L.define([]),
});

//

const name = 'editor';
const createAction = createPrefixedAction(name);
const prefix = x => `${name}/${x}`;

//

const selectEntityObject = id => ['entities', L.elems, L.whereEq({ id })];
const appendEntity = ['entities', L.appendTo];

//

export const addEntity = createAction(prefix('addEntity'), entity => ({
  payload: L.modify([entityL, 'id'], x => (!x ? uuid() : x), entity),
}));

export const selectEntity = createAction('selectEntity');

export const resetCurrent = createAction('resetCurrent');

export const toggleEntity = createAction('toggleEntity');

export const startEntityMove = createAction('startEntityMove');

export const moveEntity = createAction('moveEntity');

export const moveEntityDelta = createAction('moveEntityDelta');

export const stopEntityMove = createAction('stopEntityMove');

//

/**
 * @type {EditorState}
 */
const initialState = L.get(stateL, undefined);

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addEntity, (s, a) => L.set(appendEntity, a.payload, original(s)))
      .addCase(resetCurrent, s => L.remove('current', original(s)))
      .addCase(selectEntity, (s, a) => L.set('current', a.payload, original(s)))
      .addCase(toggleEntity, (s, a) =>
        L.modify(
          [selectEntityObject(a.payload.id), 'enabled'],
          R.not,
          original(s),
        ),
      )
      .addCase(startEntityMove, (s, a) =>
        L.set([selectEntityObject(a.payload.id), 'moving'], true, original(s)),
      )
      .addCase(stopEntityMove, (s, a) =>
        L.set([selectEntityObject(a.payload.id), 'moving'], false, original(s)),
      )
      .addCase(moveEntity, (s, a) =>
        L.set(
          [selectEntityObject(a.payload.id), 'pos'],
          a.payload.pos,
          original(s),
        ),
      )
      .addCase(moveEntityDelta, (s, a) =>
        L.modify(
          [selectEntityObject(a.payload.id), 'pos'],
          ([x, y]) => [x + a.payload.pos[0], y + a.payload.pos[1]],
          original(s),
        ),
      );
  },
});

export default slice.reducer;

//

/**
 * @typedef {object} EditorState
 * @prop {boolean} dragging
 * @prop {IEntity} current
 * @prop {IEntity[]} entities
 */

/**
 * @typedef {object} Entity
 * @prop {object} module
 * @prop {string} id
 * @prop {[number, number]} pos
 * @prop {boolean} enabled
 */
