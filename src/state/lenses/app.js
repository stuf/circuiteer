import * as L from 'partial.lenses';
import { sizeL } from './common';

export const stateL = L.pickIn({
  menu: {
    visible: L.valueOr(false),
  },
  tier: [],
  grid: {
    size: sizeL,
  },
});

export const gridSizeL = [stateL, 'grid', 'size'];
