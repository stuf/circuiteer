import { createAction, createSlice } from '@reduxjs/toolkit';

const name = 'application';
const prefix = x => [name, x].join('/');

const initialState = {
  splashDelay: 1000,
  flags: {
    showSplash: true,
  },
};

//

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {},
});

//

export default slice.reducer;
