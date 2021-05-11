import { configureStore } from '@reduxjs/toolkit';

import * as reducers from './state';

import { Tier, DefaultSize } from 'config';

const preloadedState = {
  editor: {
    dragging: false,
    entities: [
      {
        pos: [2, 2],
        module: {
          id: 'shelter',
          shortId: 's',
          name: 'Shelter',
          power: 1,
          tier: Tier.XLARGE,
          size: DefaultSize.XLARGE,
          powerType: 'always',
        },
        id: '262ec14e-940b-41b3-8c4a-6958afff5332',
        enabled: false,
      },
      {
        pos: [11, 2],
        module: {
          id: 'mediumWindTurbine',
          shortId: 'mwt',
          name: 'Medium Wind Turbine',
          power: 5,
          powerType: 'wind',
          size: DefaultSize.MEDIUM,
          tier: Tier.MEDIUM,
        },
        id: '9d2d6e06-7e1f-4021-b4cb-dbbb7b6515d0',
        enabled: true,
      },
      {
        pos: [11, 7],
        module: {
          id: 'mediumSolarPanel',
          shortId: 'msp',
          name: 'Medium Solar Panel',
          power: 4,
          powerType: 'sun',
          size: DefaultSize.MEDIUM,
          tier: Tier.MEDIUM,
        },
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
