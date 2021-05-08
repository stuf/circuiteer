import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

//

/**
 * @type {import('@reduxjs/toolkit').EntityAdapter<ModuleObject>}
 */
const moduleAdapter = createEntityAdapter({
  selectId: x => x.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id),
});

//

const name = 'experiment';

const initialState = moduleAdapter.getInitialState();

//

const slice = createSlice({
  name,
  initialState,
  reducers: {
    add: moduleAdapter.addOne,
    populate: moduleAdapter.setAll,
  },
});

export default slice.reducer;

const { add, populate } = slice.actions;

export { add, populate };

//

export const selectors = moduleAdapter.getSelectors();
