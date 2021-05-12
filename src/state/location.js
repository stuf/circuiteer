// @ts-check
import * as L from 'partial.lenses';

import { createSlice, original } from '@reduxjs/toolkit';
import { createPrefixedAction } from 'common/util';

const name = 'location';
const createAction = createPrefixedAction(name);

//

export const changeLocation = createAction('changeLocation');

/**
 * @type {Game.IDifficulty}
 */
const Difficulty = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  VERY_HARD: 'veryHard',
};

/**
 * @type {Game.IPowerStrength}
 */
const Wind = {
  VERY_LOW: 0.25,
  LOW: 0.5,
  MEDIUM: 1,
  HIGH: 1.5,
  VERY_HIGH: 1.75,
};

/**
 * @type {Game.IPowerStrength}
 */
const Sun = {
  VERY_LOW: 0.25,
  LOW: 0.5,
  MEDIUM: 1,
  HIGH: 1.5,
  VERY_HIGH: 1.75,
};

/**
 * @type {Game.ILocation[]}
 */
const locations = [
  {
    id: 'sylva',
    difficulty: Difficulty.EASY,
    wind: Wind.MEDIUM,
    sun: Sun.MEDIUM,
    cycle: [720, 60],
  },
  {
    id: 'desolo',
    difficulty: Difficulty.EASY,
    wind: Wind.LOW,
    sun: Sun.HIGH,
    cycle: 115,
  },
  {
    id: 'calidor',
    difficulty: Difficulty.MEDIUM,
    wind: Wind.LOW,
    sun: Sun.VERY_HIGH,
  },
  {
    id: 'vesania',
    difficulty: Difficulty.MEDIUM,
    wind: Wind.LOW,
    sun: Sun.HIGH,
  },
  {
    id: 'novus',
    difficulty: Difficulty.MEDIUM,
    wind: Wind.HIGH,
    sun: Sun.HIGH,
  },
  {
    id: 'glacio',
    difficulty: Difficulty.HARD,
    wind: Wind.VERY_HIGH,
    sun: Sun.VERY_LOW,
  },
  {
    id: 'atrox',
    difficulty: Difficulty.VERY_HARD,
    wind: Wind.LOW,
    sun: Sun.LOW,
  },
];

//

/**
 * @type {App.State.Location}
 */
const initialState = {
  locations,
  current: 'sylva',
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
