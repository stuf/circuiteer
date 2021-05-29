import { createSlice } from '@reduxjs/toolkit';
import { createPrefixedAction } from 'common/util';

const name = 'modal';
const createAction = createPrefixedAction(name);

//

export const showModal = createAction('showModal');
export const hideModal = createAction('hideModal');
export const toggleModal = createAction('toggleModal');

//

const initialState = {
  modals: {},
};

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(showModal, (s, a) => {
        s.modals[a.payload] = true;
      })
      .addCase(hideModal, (s, a) => {
        s.modals[a.payload] = false;
      })
      .addCase(toggleModal, (s, a) => {
        s.modals[a.payload] = !s.modals[a.payload];
      });
  },
});

export default slice.reducer;
