/**
 * @module
 * @deprecated
 */

/**
 * Material type enum
 */
export const MaterialType = {
  NATURAL: 'natural',
  REFINED: 'refined',
  COMPOSITE: 'composite',
  ATMOSPHERIC: 'atmospheric',
  OTHER: 'other',
};

/**
 * @deprecated
 */
const materials = {
  [MaterialType.NATURAL]: [
    {
      id: 'soil',
      displayName: 'Soil',
    },
    {
      id: 'organic',
      displayName: 'Organic',
    },
    {
      id: 'compound',
      displayName: 'Compound',
    },
    {
      id: 'resin',
      displayName: 'Resin',
    },
  ],

  [MaterialType.REFINED]: [
    {
      id: 'copper',
      displayName: 'Copper',
    },
    {
      id: 'glass',
      displayName: 'Glass',
    },
  ],

  [MaterialType.COMPOSITE]: [],

  [MaterialType.ATMOSPHERIC]: [],

  [MaterialType.OTHER]: [],
};

/**
 * @deprecated
 */
export const Material = Object.entries(materials).reduce((o, [k, xs]) => {
  return Object.assign(
    {},
    o,
    xs.reduce((_o, x) => ({ ..._o, [x.id]: { ...x, type: k } }), {}),
  );
}, {});
