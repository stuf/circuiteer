import { createContext } from 'react';
import { modules } from './config';

export const initState = () => ({
  canvas: {
    grid: [32, 32],
    mouse: {
      pos: [0, 0],
    },
  },
  entities: [
    {
      id: '80951974-e2de-4e02-958b-19390dcc1add',
      pos: [4, 4],
      type: 'dummyGenerator',
    },
    {
      id: '8a07cbf6-f6ee-45bb-8d4f-415348418998',
      pos: [7, 4],
      type: 'dummyConsumer',
    },
    {
      id: 'e6c634d7-80ba-4b34-a975-ffd3a87c3760',
      pos: [4, 7],
      type: 'dummyConsumer',
    },
    {
      id: '2ccb347b-e059-4280-ae38-213ee7dae9b1',
      pos: [7, 7],
      type: 'dummyConsumer',
    },
    {
      id: '4d2eb1bc-ccb1-4e05-bd50-28607078e76e',
      pos: [10, 4],
      type: 'largeDummyGenerator',
    },
    {
      id: '58acc795-60ce-40d7-8640-25cdf8c0239d',
      pos: [10, 9],
      type: 'largeDummyConsumer',
    },
    // {
    //   id: '123',
    //   pos: [4, 4],
    //   size: [8, 8],
    //   type: 'platform',
    //   attachments: [],
    // },
  ],
  modules,
});

/**
 * @type {React.Context<IContextState>}
 */
export const State = createContext();
