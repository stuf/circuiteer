export const Tier = {
  OTHER: -1,
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
  XBOX: [16, 16],
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

/**
 * @type {IModule[]}
 */
const small = [
  {
    id: 'smallWindTurbine',
    shortId: 'swt',
    power: 1.5,
    powerType: PowerType.WIND,
  },
  {
    id: 'smallSolarPanel',
    shortId: 'ss',
    power: 1,
    powerType: PowerType.SUN,
  },
  {
    id: 'smallGenerator',
    shortId: 'sg',
    power: 2,
    powerType: PowerType.POWERED,
  },
  {
    id: 'qtRtg',
    shortId: 'qr',
    power: 1,
    powerType: PowerType.ALWAYS,
  },
  {
    id: 'smallBattery',
    shortId: 'sb',
    power: 1,
    powerType: PowerType.POWERED,
    capacity: 32,
  },
  {
    id: 'portableOxygenator',
    shortId: 'po',
    power: -1,
  },
].map(it => ({ ...it, tier: Tier.SMALL, size: DefaultSize.SMALL }));

/**
 * @type {IModule[]}
 */
const medium = [
  {
    id: 'fieldShelter',
    shortId: 'fs',
    power: 0.5,
    powerType: PowerType.ALWAYS,
  },
  {
    id: 'mediumWindTurbine',
    shortId: 'mwt',
    power: 5,
    powerType: PowerType.WIND,
  },
  {
    id: 'mediumSolarPanel',
    shortId: 'msp',
    power: 4,
    powerType: PowerType.SUN,
  },
  {
    id: 'mediumGenerator',
    shortId: 'mg',
    power: 9,
    powerType: PowerType.POWERED,
  },
  {
    id: 'mediumBattery',
    shortId: 'mb',
    power: 5,
    powerType: PowerType.POWERED,
    capacity: 512,
  },
  {
    id: 'rtg',
    shortId: 'rtg',
    power: 4,
    powerType: PowerType.ALWAYS,
  },
  {
    id: 'autoArm',
    shortId: 'aa',
    power: -1,
  },
  {
    id: 'mediumShredder',
    shortId: 'ms',
    power: -5,
  },
].map(it => ({ ...it, tier: Tier.MEDIUM, size: DefaultSize.MEDIUM }));

/**
 * @type {IModule[]}
 */
const large = [
  {
    id: 'largeWindTurbine',
    shortId: 'lwt',
    power: 10,
    powerType: PowerType.WIND,
  },
  {
    id: 'largeSolarPanel',
    shortId: 'lsp',
    power: 8,
    powerType: PowerType.SUN,
  },
  {
    id: 'researchChamber',
    shortId: 'rc',
    power: -2,
  },
  {
    id: 'smeltingFurnace',
    shortId: 'sf',
    power: -5,
  },
  {
    id: 'soilCentrifuge',
    shortId: 'sc',
    power: -6,
  },
  {
    id: 'chemistryLab',
    shortId: 'cl',
    power: -10,
  },
  {
    id: 'atmosphericCondenser',
    shortId: 'ac',
    power: -20,
  },
  {
    id: 'largeShredder',
    shortId: 'ls',
    power: -7.5,
  },
].map(it => ({
  ...it,
  tier: Tier.LARGE,
  size: DefaultSize.LARGE,
}));

/**
 * @type {IModule[]}
 */
const extraLarge = [
  {
    id: 'shelter',
    shortId: 's',
    power: 1,
    powerType: PowerType.ALWAYS,
    size: DefaultSize.XLARGE,
  },
  {
    id: 'xlargeWindTurbine',
    shortId: 'xlwt',
    power: 17,
    powerType: PowerType.WIND,
  },
  {
    id: 'solarArray',
    shortId: 'sa',
    power: 14,
  },
  {
    id: 'extraLargeShredder',
    shortId: 'xls',
    power: -10,
  },
].map(it => ({ ...it, tier: Tier.XLARGE, size: DefaultSize.XLARGE }));

/**
 * @type {IModule[]}
 */
const other = [
  {
    id: 'wreckedSolarArray',
    shortId: 'wsa',
    power: 64,
    powerType: PowerType.SUN,
    tier: Tier.OTHER,
    size: DefaultSize.XBOX,
  },
];

/**
 * @type {ModuleDict}
 */
export const modules = [
  ...small,
  ...medium,
  ...large,
  ...extraLarge,
  ...other,
].reduce((o, it) => ({ ...o, [it.id]: it }), {});
