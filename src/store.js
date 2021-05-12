// @ts-check
import { configureStore } from '@reduxjs/toolkit';

import * as reducers from './state';

/**
 * @type {Partial<App.Store>}
 */
const preloadedState = {
  application: {
    splash: {
      delay: 1000,
      show: true,
    },
  },
  options: {
    flags: {
      hideInvalid: false,
      showEditor: true,
      showEfficiencyAsMultiplier: true,
      showPowerStatus: true,
      showShoppingList: true,
    },
  },
  editor: {
    dragging: false,
    current: '9d2d6e06-7e1f-4021-b4cb-dbbb7b6515d0',
    entities: [
      {
        pos: [2, 2],
        module: 'shelter',
        id: '262ec14e-940b-41b3-8c4a-6958afff5332',
        enabled: false,
      },
      {
        pos: [11, 2],
        module: 'mediumWindTurbine',
        id: '9d2d6e06-7e1f-4021-b4cb-dbbb7b6515d0',
        enabled: true,
      },
      {
        pos: [11, 7],
        module: 'mediumSolarPanel',
        id: '2fb98a1d-0738-4def-bf52-f0c91a0e1e45',
        enabled: false,
      },
    ],
  },
  drag: {
    dragging: false,
    pos: [0, 0],
    size: [0, 0],
  },
  grid: {
    size: [48, 48],
  },
};

const store = configureStore({ preloadedState, reducer: reducers });

export default store;
