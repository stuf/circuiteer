import { DefaultSize } from 'common/defaults';

const small = { tier: 1, size: DefaultSize[1] };
const medium = { tier: 2, size: DefaultSize[2] };
const large = { tier: 3, size: DefaultSize[3] };
const xlarge = { tier: 4, size: DefaultSize[4] };

export const objects = [
  {
    id: 'qtRtg',
    power: 1,
    powerType: 'constant',
    ...small,
  },
  {
    id: 'smallGenerator',
    power: 2,
    powerType: 'powered',
    ...small,
  },
  {
    id: 'smallSolarPanel',
    power: 1,
    powerType: 'solar',
    ...small,
  },
  {
    id: 'smallWindTurbine',
    power: 1.5,
    powerType: 'wind',
    ...small,
  },
  {
    id: 'powerCells',
    power: 1,
    powerType: 'powered',
    ...small,
  },
  {
    id: 'smallBattery',
    power: 1,
    powerType: 'constant',
    ...small,
  },
  { id: 'rtg', power: 4, powerType: 'constant', ...medium },
  { id: 'fieldShelter', power: 1, powerType: 'constant', ...medium },
  { id: 'mediumGenerator', power: 9, powerType: 'powered', ...medium },
  {
    id: 'mediumWindTurbine',
    tier: 2,
    power: 5,
    powerType: 'wind',
    size: DefaultSize[2],
  },
  {
    id: 'mediumSolarPanel',
    tier: 2,
    power: 4,
    powerType: 'solar',
    size: DefaultSize[2],
  },
  {
    id: 'mediumPrinter',
    power: -2,
    powerType: 'onDemand',
    ...medium,
  },
  { id: 'largeSolarPanel', power: 8, powerType: 'solar', ...large },
  { id: 'largeWindTurbine', power: 10, powerType: 'wind', ...large },
  {
    id: 'largePrinter',
    power: -5,
    powerType: 'onDemand',
    ...large,
  },
  {
    id: 'smeltingFurnace',
    power: -5,
    powerType: 'onDemand',
    ...large,
  },
  {
    id: 'chemistryLab',
    power: -10,
    powerType: 'onDemand',
    ...large,
  },
  {
    id: 'soilCentrifuge',
    power: -6,
    powerType: 'onDemand',
    ...large,
  },
  {
    id: 'atmosphericCondenser',
    power: -20,
    powerType: 'onDemand',
    ...large,
  },
  {
    id: 'autoExtractor',
    power: -8,
    powerType: 'onDemand',
    ...xlarge,
  },
];
