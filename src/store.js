import { configureStore } from '@reduxjs/toolkit';

import * as reducers from './state';

const preloadedState = {
  editor: {
    dragging: false,
    entities: [
      {
        pos: [16, 8],
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
        pos: [21, 8],
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
        pos: [16, 13],
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
      {
        pos: [21, 13],
        module: {
          id: 'largeDummyGenerator',
          shortId: 'ldg',
          name: 'Large Generator (Dummy)',
          power: 11,
          tier: 3,
          size: [4, 4],
        },
        id: '378699e0-3242-42cc-916f-b7ee5cfe4ced',
        enabled: true,
      },
    ],
    current: '378699e0-3242-42cc-916f-b7ee5cfe4ced',
  },
  drag: {
    dragging: false,
    pos: [0, 0],
    size: [0, 0],
  },
  grid: {
    size: [32, 32],
  },
  module: {
    tier: {
      1: [
        {
          id: 'dummyGenerator',
          shortId: 'dg',
          name: 'Generator (Dummy)',
          power: 5,
          tier: 1,
          size: [2, 2],
        },
        {
          id: 'dummyConsumer',
          shortId: 'dc',
          name: 'Consumer (Dummy)',
          power: -2.5,
          tier: 1,
          size: [2, 2],
        },
      ],
      2: [
        {
          id: 'mediumDummy',
          shortId: 'md',
          name: 'Medium (Dummy)',
          power: 0,
          tier: 2,
          size: [4, 4],
        },
      ],
      3: [
        {
          id: 'largeDummyConsumer',
          shortId: 'ldc',
          name: 'Large Consumer (Dummy)',
          power: -12,
          tier: 3,
          size: [4, 4],
        },
        {
          id: 'largeDummyGenerator',
          shortId: 'ldg',
          name: 'Large Generator (Dummy)',
          power: 11,
          tier: 3,
          size: [4, 4],
        },
      ],
      4: [
        {
          id: 'xlargeDummy',
          shortId: 'xld',
          name: 'X-Large (Dummy)',
          power: 0,
          tier: 4,
          size: [8, 8],
        },
      ],
    },
  },
  location: {
    locations: [
      {
        id: 1,
        name: 'firstPlanet',
        displayName: 'First Planet',
      },
    ],
    current: 1,
  },
};

const store = configureStore({ preloadedState, reducer: reducers });

export default store;
