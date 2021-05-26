import { PowerType } from '../powertype';
import { Tier } from '../tier';
import { DefaultSize } from '../default-size';

/**
 * @type {IModule[]}
 */
export const extraLarge = [
  {
    id: 'shelter',
    shortId: 's',
    power: 1,
    powerType: PowerType.ALWAYS,
    unlockCost: null,
    recipe: {
      plastic: 2,
      silicone: 2,
    },
  },
  {
    id: 'autoExtractor',
    shortId: 'ae',
    power: -8,
    unlockCost: 7500,
    recipe: {
      rubber: 1,
      tungstenCarbide: 1,
      steel: 2,
    },
  },
  {
    id: 'xlargeWindTurbine',
    shortId: 'xlwt',
    power: 17,
    powerType: PowerType.WIND,
    recipe: {
      iron: 1,
      ceramic: 1,
      graphene: 1,
      aluminumAlloy: 1,
    },
  },
  {
    id: 'solarArray',
    shortId: 'sa',
    power: 14,
    recipe: {
      copper: 1,
      glass: 1,
      graphene: 1,
      aluminumAlloy: 1,
    },
  },
  {
    id: 'extraLargeShredder',
    shortId: 'xls',
    power: -10,
    recipe: {
      steel: 2,
      tungstenCarbide: 2,
    },
  },
  {
    id: 'extraLargeStorage',
    shortId: 'xlst',
    unlockCost: 2000,
    recipe: {
      iron: 2,
      ceramic: 2,
    },
  },
].map(it => ({ ...it, tier: Tier.XLARGE, size: DefaultSize.XLARGE }));
