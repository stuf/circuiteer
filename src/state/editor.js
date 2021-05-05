import * as L from 'partial.lenses';
import { createSlice, createAction, original } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

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
const prefix = x => `${name}/${x}`;

//

export const addEntity = createAction(prefix('addEntity'), entity => ({
  payload: L.set('id', uuid(), entity),
}));

//

/**
 * @type {EditorState}
 */
const initialState = L.get(stateL, undefined);

const reducer = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [addEntity]: (s, a) =>
      L.set(['entities', L.appendTo], a.payload, original(s)),
  },
});

export default reducer;

//

/**
 * @typedef {object} EditorState
 * @prop {boolean} dragging
 * @prop {IEntity[]} entities
 */

/**
 * @typedef {object} Entity
 * @prop {object} module
 * @prop {string} id
 * @prop {[number, number]} pos
 * @prop {boolean} enabled
 */
