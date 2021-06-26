import * as L from 'partial.lenses';
import { createSlice, original } from '@reduxjs/toolkit';
import { createPrefixedActionCreator } from 'common/util';

const name = 'canvas';
const createAction = createPrefixedActionCreator(name);

//

const initialState = {
  adding: null,
  drag: null,
  external: null,
  move: null,
};

const addingNewObject = ['adding', L.required(null)];
const draggedObject = ['drag', L.required(null)];
const externalObject = ['external', L.required(null)];

//

export const dragExternalStart = createAction('dragExternalStart');
export const dragExternalStop = createAction('dragExternalStop');
export const dragStart = createAction('dragStart');
export const dragStop = createAction('dragStop');
export const addingNew = createAction('addingNew');
export const addedNew = createAction('addedNew');

//

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(addingNew, (s, a) =>
        L.set([addingNewObject, 'entity'], a.payload, original(s)),
      )
      .addCase(addedNew, (s, a) => L.remove(addingNewObject, original(s)))
      .addCase(dragExternalStart, (s, a) =>
        L.set([externalObject, 'size'], a.payload.size, original(s)),
      )
      .addCase(dragExternalStop, (s, a) =>
        L.remove(externalObject, original(s)),
      )
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
