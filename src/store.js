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
        id: '262ec14e-940b-41b3-8c4a-6958afff5332',
        pos: [2, 2],
        module: 'shelter',
        enabled: false,
      },
      {
        id: '9d2d6e06-7e1f-4021-b4cb-dbbb7b6515d0',
        pos: [11, 2],
        module: 'mediumWindTurbine',
        enabled: true,
      },
      {
        id: '2fb98a1d-0738-4def-bf52-f0c91a0e1e45',
        pos: [11, 8],
        module: 'mediumSolarPanel',
        enabled: false,
      },
      {
        id: 'ff6de281-5345-4ff4-af7c-eb9f2afd8694',
        module: 'mediumShredder',
        pos: [11, 5],
        enabled: true,
      },
      {
        id: '5b4c6fc0-5066-4962-973b-9d62316e4fa7',
        module: 'mediumShredder',
        pos: [14, 5],
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
