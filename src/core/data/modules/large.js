import { PowerType } from '../powertype';
import { Tier } from '../tier';
import { DefaultSize } from '../../../config';

/**
 * @type {IModule[]}
 */
export const large = [
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
