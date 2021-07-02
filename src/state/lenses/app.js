import * as L from 'partial.lenses';
import { sizeL } from './common';

export const visibleL = ['visible', L.define(false)];

export const stateL = L.pickIn({
  menu: {
    visible: L.define(false),
  },
  guideLayer: {
    visible: L.define(false),
  },
  grid: {
    size: sizeL,
  },
});

export const gridSizeL = [stateL, 'grid', 'size'];
export const guideLayerL = [stateL, 'guideLayer'];
