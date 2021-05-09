export const Tier = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
  XLARGE: 4,
};

export const DefaultSize = {
  SMALL: [1, 1],
  MEDIUM: [2, 2],
  LARGE: [4, 4],
  XLARGE: [8, 8],
};

/**
 * @readonly
 * @enum {PowerType}
 */
export const PowerType = {
  ALWAYS: 'always',
  POWERED: 'powered',
  SUN: 'sun',
  WIND: 'wind',
};

/* eslint-disable */
/**
 * @type {IModule[]}
 */
const small = [
  {
    id: 'smallWindTurbine',
    shortId: 'swt',
    name: 'Small Wind Turbine',
    power: 1.5,
    powerType: 'wind',
  },
  {
    id: 'smallSolar',
    shortId: 'ss',
    name: 'Small Solar',
    power: 1,
    powerType: 'sun',
  },
];

/**
 * @type {IModule[]}
 */
const medium = [
  {
    id: 'mediumWindTurbine',
    shortId: 'mwt',
    name: 'Medium Wind Turbine',
    power: 5,
    powerType: 'wind',
  },
  {
    id: 'mediumSolarPanel',
    shortId: 'msp',
    name: 'Medium Solar Panel',
    power: 4,
    powerType: 'sun',
  },
];

/**
 * @type {Object.<string, IModule>}
 */
export const modules = {
  dummyGenerator: {
    id: 'dummyGenerator',
    shortId: 'dg',
    name: 'Generator (Dummy)',
    power: 5,
    tier: 1,
    size: [2, 2],
  },
  dummyConsumer: {
    id: 'dummyConsumer',
    shortId: 'dc',
    name: 'Consumer (Dummy)',
    power: -2.5,
    tier: 1,
    size: [2, 2],
  },
  mediumDummy: {
    id: 'mediumDummy',
    shortId: 'md',
    name: 'Medium (Dummy)',
    power: 0,
    tier: 2,
    size: [4, 4],
  },
  largeDummyConsumer: {
    id: 'largeDummyConsumer',
    shortId: 'ldc',
    name: 'Large Consumer (Dummy)',
    power: -12,
    tier: 3,
    size: [4, 4],
  },
  largeDummyGenerator: {
    id: 'largeDummyGenerator',
    shortId: 'ldg',
    name: 'Large Generator (Dummy)',
    power: 11,
    tier: 3,
    size: [4, 4],
  },
  shelter: {
    id: 'shelter',
    shortId: 's',
    name: 'Shelter',
    power: 1,
    tier: Tier.XLARGE,
    size: DefaultSize.XLARGE,
  },
  fieldShelter: {
    id: 'fieldShelter',
    shortId: 'fs',
    name: 'Field Shelter',
    power: 0.5,
    powerType: 'always',
    tier: Tier.MEDIUM,
    size: DefaultSize.MEDIUM,
  },
  xlargeWindTurbine: {
    id: 'xlargeWindTurbine',
    shortId: 'xlwt',
    name: 'XL Wind Turbine',
    power: 17,
    powerType: 'wind',
    tier: Tier.XLARGE,
    size: DefaultSize.XLARGE,
  },
  xlargeDummy: {
    id: 'xlargeDummy',
    shortId: 'xld',
    name: 'X-Large (Dummy)',
    power: 0,
    tier: 4,
    size: [8, 8],
  },
};

/* eslint-enable */
