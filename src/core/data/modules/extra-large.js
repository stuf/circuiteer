import { PowerType } from '../powertype';
import { Tier } from '../tier';
import { DefaultSize } from '../../../config';

/**
 * @type {IModule[]}
 */
export const extraLarge = [
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
