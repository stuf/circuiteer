import { configureStore } from '@reduxjs/toolkit';

import * as reducers from './state';

const preloadedState = {
  editor: {
    dragging: false,
    entities: [
      {
        pos: [2, 2],
        module: {
          id: 'largeDummyGenerator',
          shortId: 'ldg',
          name: 'Large Generator (Dummy)',
          power: 11,
          tier: 3,
          size: [4, 4],
        },
        id: '262ec14e-940b-41b3-8c4a-6958afff5332',
        enabled: false,
      },
      {
        pos: [7, 2],
        module: {
          id: 'largeDummyConsumer',
          shortId: 'ldc',
          name: 'Large Consumer (Dummy)',
          power: -12,
          tier: 3,
          size: [4, 4],
        },
        id: '9d2d6e06-7e1f-4021-b4cb-dbbb7b6515d0',
        enabled: true,
      },
      {
        pos: [2, 7],
        module: {
          id: 'largeDummyConsumer',
          shortId: 'ldc',
          name: 'Large Consumer (Dummy)',
          power: -12,
          tier: 3,
          size: [4, 4],
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
    size: [32, 32],
  },
};

const store = configureStore({ preloadedState, reducer: reducers });

export default store;
