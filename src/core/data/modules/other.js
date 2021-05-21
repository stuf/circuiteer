import { PowerType } from '../powertype';
import { Tier } from '../tier';
import { DefaultSize } from '../../../config';

/**
 * @type {IModule[]}
 */
export const other = [
  {
    id: 'wreckedSolarArray',
    shortId: 'wsa',
    power: 64,
    powerType: PowerType.SUN,
    tier: Tier.OTHER,
    size: DefaultSize.XBOX,
  },
];
