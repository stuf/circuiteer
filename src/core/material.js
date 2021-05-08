export const MaterialType = {
  NATURAL: 'natural',
  REFINED: 'refined',
  COMPOSITE: 'composite',
  ATMOSPHERIC: 'atmospheric',
  OTHER: 'other',
};

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

  [MaterialType.REFINED]: [],

  [MaterialType.COMPOSITE]: [],

  [MaterialType.ATMOSPHERIC]: [],

  [MaterialType.OTHER]: [],
};

export const Material = Object.entries(materials).reduce((o, [k, xs]) => {
  return Object.assign(
    {},
    o,
    xs.reduce((_o, x) => ({ ..._o, [x.id]: { ...x, type: k } }), {}),
  );
}, {});
