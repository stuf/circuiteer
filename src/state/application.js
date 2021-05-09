import { createAction, createSlice } from '@reduxjs/toolkit';

const name = 'application';
const prefix = x => [name, x].join('/');

const initialState = {
  splash: {
    delay: 1000,
    show: true,
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
