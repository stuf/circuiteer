import { DefaultSize } from 'common/defaults';

export const objects = [
  {
    id: 'qtRtg',
    tier: 1,
    power: 1,
    powerType: 'constant',
    size: DefaultSize[1],
  },
  { id: 'rtg', tier: 2, power: 4, powerType: 'constant', size: DefaultSize[2] },
  {
    id: 'mediumPrinter',
    tier: 2,
    power: -2,
    powerType: 'onDemand',
    size: DefaultSize[2],
  },
  {
    id: 'largePrinter',
    tier: 3,
    power: -5,
    powerType: 'onDemand',
    size: DefaultSize[3],
  },
  {
    id: 'soilCentrifuge',
    tier: 3,
    power: -6,
    powerType: 'onDemand',
    size: DefaultSize[3],
  },
];
