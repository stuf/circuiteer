import { Pattern as P } from './constants';

const defaults = { width: 32, height: 32 };

export const Pattern = {
  [P.DIAGONAL]: {
    ...defaults,
    strokeWidth: 2,
    strokeDasharray: '5 2',
    className: 'stroke-light',
  },
  [P.DOTTED_GRID]: {
    ...defaults,
    radius: 1,
    className: 'fill-light',
  },
};
