import * as L from 'partial.lenses';
import { sizeL } from './common';

export const visibleL = ['visible', L.define(false)];

const orFalse = L.define(false);

export const menuL = L.pickIn({
  visible: orFalse,
});

export const gridL = L.pickIn({
  visible: orFalse,
  size: sizeL,
});

export const guideLayerL = L.pickIn({
  visible: orFalse,
});

export const stateL = L.pickIn({
  menu: menuL,
  guideLayer: guideLayerL,
  grid: gridL,
});

export const StateL = {
  menuVisible: [stateL, 'menu', visibleL],
  guideLayerVisible: [stateL, 'guideLayer', visibleL],
  gridVisible: [stateL, 'grid', visibleL],
  gridSize: [stateL, 'grid', 'size'],
  grid: [stateL, 'grid'],
  guideLayer: [stateL, 'guideLayer'],
};
