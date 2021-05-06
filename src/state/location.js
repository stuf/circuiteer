import * as L from 'partial.lenses';

import { createAction, createSlice, original } from '@reduxjs/toolkit';

const name = 'location';
const prefix = x => [name, x].join('/');

//

export const changeLocation = createAction(prefix('changeLocation'));

const Difficulty = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
  VERY_HARD: 4,
};

const Wind = {
  VERY_LOW: 0.25,
  LOW: 0.5,
  MEDIUM: 1,
  HIGH: 1.5,
  VERY_HIGH: 1.75,
};

const Sun = {
  VERY_LOW: 0.25,
  LOW: 0.5,
  MEDIUM: 1,
  HIGH: 1.5,
  VERY_HIGH: 1.75,
};

//

const initialState = {
  locations: [
    {
      id: 1,
      name: 'sylva',
      displayName: 'Sylva',
      difficulty: Difficulty.EASY,
      wind: Wind.MEDIUM,
      sun: Sun.MEDIUM,
    },
    {
      id: 2,
      name: 'desolo',
      displayName: 'Desolo',
      difficulty: Difficulty.EASY,
      wind: Wind.LOW,
      sun: Sun.HIGH,
    },
    {
      id: 3,
      name: 'calidor',
      displayName: 'Calidor',
      difficulty: Difficulty.MEDIUM,
      wind: Wind.LOW,
      sun: Sun.VERY_HIGH,
    },
    {
      id: 4,
      name: 'vesania',
      displayName: 'Vesania',
      difficulty: Difficulty.MEDIUM,
      wind: Wind.LOW,
      sun: Sun.HIGH,
    },
    {
      id: 5,
      name: 'novus',
      displayName: 'Novus',
      difficulty: Difficulty.MEDIUM,
      wind: Wind.HIGH,
      sun: Sun.HIGH,
    },
    {
      id: 6,
      name: 'glacio',
      displayName: 'Glacio',
      difficulty: Difficulty.HARD,
      wind: Wind.VERY_HIGH,
      sun: Sun.VERY_LOW,
    },
    {
      id: 7,
      name: 'atrox',
      displayName: 'Atrox',
      difficulty: Difficulty.VERY_HARD,
      wind: Wind.LOW,
      sun: Sun.LOW,
    },
  ],
  current: 1,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(changeLocation, (s, a) =>
      L.set('current', a.payload, original(s)),
    );
  },
});

export default slice.reducer;

//

/**
 * @typedef {object} Location
 * @prop {number} id
 * @prop {string} name
 * @prop {string} displayName
 */
