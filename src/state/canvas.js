import * as L from 'partial.lenses';
import { createSlice, original } from '@reduxjs/toolkit';
import { createPrefixedActionCreator } from 'common/util';

const name = 'canvas';
const createAction = createPrefixedActionCreator(name);

//

const initialState = {
  drag: null,
  move: null,
};

const draggedObject = ['drag', L.required(null)];

//

export const dragStart = createAction('dragStart');
export const dragStop = createAction('dragStop');

//

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(dragStart, (s, a) =>
        L.transform(
          L.seq(
            [draggedObject, L.setOp(a.payload.id)],
            [
              'move',
              L.seq(
                L.removeOp,
                ['from', L.setOp(a.payload.pos)],
                ['id', L.setOp(a.payload.id)],
              ),
            ],
          ),

          original(s),
        ),
      )

      .addCase(dragStop, (s, a) =>
        L.transform(
          L.seq(
            [draggedObject, L.removeOp],
            [
              'move',
              L.seq(
                ['to', L.setOp(a.payload.pos)],
                ['id', L.setOp(a.payload.id)],
              ),
            ],
          ),

          original(s),
        ),
      ),
});

const reducer = slice.reducer;

export default reducer;
