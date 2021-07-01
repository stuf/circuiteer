import * as L from 'partial.lenses';

export const stateL = L.pickIn({
  name: L.define(null),
});

export const nameL = ['name'];
