import { AnyAction, Reducer, Slice } from '@reduxjs/toolkit';

export interface IState {
  /**
   * Should we show the application splash screen on initial
   * visit.
   */
  splash: {
    delay: number;
    show: boolean;
  };
}

type ThisSlice = Slice<IState, {}, 'application'>;

export type ThisReducer = Reducer<IState, AnyAction>;
