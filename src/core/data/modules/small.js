import { PowerType } from '../powertype';
import { Tier } from '../tier';
import { DefaultSize } from '../../../config';

/**
 * @type {IModule[]}
 */
export const small = [
  {
    id: 'smallWindTurbine',
    shortId: 'swt',
    power: 1.5,
    powerType: PowerType.WIND,
    recipe: {
      ceramic: 1,
    },
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
