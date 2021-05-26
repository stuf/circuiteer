import { PowerType } from '../powertype';
import { Tier } from '../tier';
import { DefaultSize } from '../default-size';

/**
 * @type {IModule[]}
 */
export const large = [
  {
    id: 'largePrinter',
    shortId: 'lp',
    power: -5,
    unlockCost: null,
    recipe: {
      compound: 3,
    },
  },
  {
    id: 'largeWindTurbine',
    shortId: 'lwt',
    power: 10,
    powerType: PowerType.WIND,
    recipe: {
      aluminumAlloy: 1,
      glass: 1,
      ceramic: 1,
    },
  },
  {
    id: 'largeSolarPanel',
    shortId: 'lsp',
    power: 8,
    powerType: PowerType.SUN,
    recipe: {
      aluminumAlloy: 1,
      glass: 1,
      copper: 1,
    },
  },
  {
    id: 'researchChamber',
    shortId: 'rc',
    power: -2,
    unlockCost: null,
    recipe: {
      compound: 2,
      resin: 1,
    },
  },
  {
    id: 'smeltingFurnace',
    shortId: 'sf',
    power: -5,
    unlockCost: 250,
    recipe: {
      resin: 2,
      compound: 1,
    },
  },
  {
    id: 'soilCentrifuge',
    shortId: 'sc',
    power: -6,
    unlockCost: 750,
    recipe: {
      compound: 2,
      aluminum: 1,
    },
  },
  {
    id: 'chemistryLab',
    shortId: 'cl',
    power: -10,
    unlockCost: 1600,
    recipe: {
      ceramic: 1,
      tungsten: 1,
      glass: 1,
    },
  },
  {
    id: 'atmosphericCondenser',
    shortId: 'ac',
    power: -20,
    unlockCost: 2200,
    recipe: {
      plastic: 1,
      glass: 1,
      iron: 1,
    },
  },
  {
    id: 'tradePlatform',
    shortId: 'tp',
    power: 0,
    unlockCost: 2500,
    recipe: {
      iron: 1,
      tungsten: 1,
      compound: 1,
    },
  },
  {
    id: 'largeShredder',
    shortId: 'ls',
    power: -7.5,
    unlockCost: 2500,
    recipe: {
      tungstenCarbide: 1,
      iron: 2,
    },
  },
  {
    id: 'largeStorage',
    shortId: 'ls',
    power: null,
    unlockCost: 2000,
    recipe: {
      ceramic: 3,
    },
  },
  {
    id: 'largeStorageSiloA',
    shortId: 'lssa',
    power: null,
    unlockCost: 5000,
    recipe: {
      aluminum: 2,
      steel: 1,
    },
  },
  {
    id: 'largeStorageSiloB',
    shortId: 'lssb',
    power: null,
    unlockCost: 7500,
    recipe: {
      steel: 3,
    },
  },
  {
    id: 'largeActiveStorage',
    shortId: ' las',
    power: null,
    unlockCost: 2000,
    recipe: {
      zinc: 1,
      aluminum: 1,
      resin: 1,
    },
  },
  {
    id: 'exoRequestPlatform',
    shortId: 'erp',
    power: null,
    unlockCost: 1000,
    recipe: {
      resin: 2,
      ceramic: 1,
    },
  },
  {
    id: 'buggy',
    shortId: 'b',
    power: -0.031,
    unlockCost: 1500,
    recipe: {
      compound: 1,
      aluminum: 1,
    },
  },
  {
    id: 'mediumRover',
    shortId: 'mr',
    power: -0.5,
    unlockCost: 3750,
    recipe: {
      plastic: 2,
      rubber: 1,
    },
  },
  {
    id: 'landingPad',
    shortId: 'lp',
    unlockCost: 750,
    recipe: {
      ceramic: 2,
      aluminum: 1,
    },
  },
].map(it => ({
  ...it,
  tier: Tier.LARGE,
  size: DefaultSize.LARGE,
}));
