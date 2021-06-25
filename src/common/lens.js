import * as L from 'partial.lenses';

export const asNormalized = L.pickIn({
  ids: L.define([]),
  entities: L.define({}),
});

export const gameEntities = ['entities', L.define([])];

export const canvasObject = L.pickIn({
  id: [],
  pos: L.define({ x: 0, y: 0 }),
  size: [],
  entity: L.define('undefined'),
  disabled: L.define(false),
  locked: L.define(false),
});

// #region Dragging

// #endregion
