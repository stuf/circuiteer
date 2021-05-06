import * as L from 'partial.lenses';

export const gridSizeIn = L.get(['grid', 'size']);

export const showSelectedEntityIn = L.get([
  'editor',
  'current',
  L.reread(x => !!x),
]);

// Options

export const optionFlagsIn = L.get(['options', 'flags']);
