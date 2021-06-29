import * as L from 'partial.lenses';
import { Action } from './constants';

export const asNormalized = L.pickIn({
  ids: L.define([]),
  entities: L.define({}),
});

export const gameEntities = ['entities', L.define([])];

export const canvasObject = L.pickIn({
  id: [],
  pos: L.define({ x: 0, y: 0 }),
  size: L.define({ width: 0, height: 0 }),
  entity: L.define('undefined'),
  disabled: L.define(false),
  locked: L.define(false),
});

// #region CanvasElement
/**
 * Focus on the `x` and `y` properties
 */
export const posL = L.props('x', 'y');

/**
 * Focus on the `width` and `height` properties
 */
export const sizeL = L.props('width', 'height');

/**
 * Focus on an object and ensure it has a specific minimal
 * structure.
 */
export const stateL = L.pickIn({
  action: L.define(Action.NONE),
  id: L.define(null),
  x: L.define(0),
  y: L.define(0),
  width: L.define(0),
  height: L.define(0),
  origin: posL,
});
// #endregion
