import * as L from 'partial.lenses';
import { createAction, createSlice, original } from '@reduxjs/toolkit';

const name = 'drag';
const prefix = x => [name, x].join('/');

export const setDragging = createAction(prefix('setDragging'));
export const setDragPos = createAction(prefix('setDragPos'));
export const setDragSize = createAction(prefix('setDragSize'));
export const setDrag = createAction(prefix('setDrag'));
export const resetDrag = createAction(prefix('resetDrag'));

const initL = L.pickIn({
  dragging: L.define(false),
  pos: L.define([0, 0]),
  size: L.define([0, 0]),
});

/**
 * @type {App.State.Drag}
 */
const initialState = L.get(initL, undefined);

//

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(resetDrag, s => L.remove(initL, original(s)))
      .addCase(setDragging, (s, a) => L.set('dragging', a.payload, original(s)))
      .addCase(setDragPos, (s, a) => L.set('pos', a.payload, original(s)))
      .addCase(setDragSize, (s, a) => L.set('size', a.payload, original(s)))
      .addCase(setDrag, (s, a) => {
        const { payload } = a;
        const { dragging, pos, size } = payload;

        if (dragging) {
          s.dragging = dragging;
        }

        if (pos) {
          s.pos = pos;
        }

        if (size) {
          s.size = size;
        }
      });
  },
});

export default slice.reducer;
