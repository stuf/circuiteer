import { Pattern as P } from './constants';

const defaults = { width: 32, height: 32 };

export const Pattern = {
  [P.DIAGONAL]: {
    ...defaults,
    className: 'stroke-light',
  },
  [P.DOTTED_GRID]: {
    ...defaults,
    radius: 1,
    className: 'fill-light',
  },
};
