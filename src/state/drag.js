import * as L from 'partial.lenses';
import { createAction, createReducer } from '@reduxjs/toolkit';

export const setDragging = createAction('setDragging');
export const setDragPos = createAction('setDragPos');
export const setDragSize = createAction('setDragSize');
export const setDrag = createAction('setDrag');
export const resetDrag = createAction('resetDrag');

//

const reducer = createReducer(
  {
    dragging: false,
    pos: [0, 0],
    size: [0, 0],
  },
  {
    [resetDrag]: (s, a) => {
      s.dragging = false;
      s.pos = [0, 0];
      s.size = [0, 0];
    },
    [setDrag]: (s, a) => {
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
    },
    [setDragging]: (s, a) => {
      s.dragging = a.payload;
    },
    [setDragPos]: (s, a) => {
      s.pos = a.payload;
    },
    [setDragSize]: (s, a) => {
      s.size = a.payload;
    },
  },
);

export default reducer;
