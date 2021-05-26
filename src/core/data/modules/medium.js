import { PowerType } from '../powertype';
import { Tier } from '../tier';
import { DefaultSize } from '../default-size';

/**
 * @type {IModule[]}
 */
export const medium = [
  {
    id: 'fieldShelter',
    shortId: 'fs',
    power: 0.5,
    powerType: PowerType.ALWAYS,
    recipe: {
      silicone: 1,
      graphene: 1,
    },
  },
  {
    id: 'mediumWindTurbine',
    shortId: 'mwt',
    power: 5,
    powerType: PowerType.WIND,
    recipe: {
      aluminum: 1,
      ceramic: 1,
    },
  },
  {
    id: 'mediumSolarPanel',
    shortId: 'msp',
    power: 4,
    powerType: PowerType.SUN,
    recipe: {
      copper: 1,
      glass: 1,
    },
  },
  {
    id: 'mediumGenerator',
    shortId: 'mg',
    power: 9,
    powerType: PowerType.POWERED,
    recipe: {
      tungsten: 1,
      aluminum: 1,
    },
  },
  {
    id: 'mediumBattery',
    shortId: 'mb',
    power: 5,
    powerType: PowerType.POWERED,
    capacity: 512,
    recipe: {
      zinc: 1,
      lithium: 1,
    },
  },
  {
    id: 'rtg',
    shortId: 'rtg',
    power: 4,
    powerType: PowerType.ALWAYS,
    recipe: {
      nanoCarbonAlloy: 1,
      lithium: 1,
    },
  },
  {
    id: 'autoArm',
    shortId: 'aa',
    power: -1,
    recipe: {
      aluminum: 1,
      graphite: 1,
    },
  },
  {
    id: 'mediumShredder',
    shortId: 'ms',
    power: -5,
    recipe: {
      iron: 2,
    },
  },
  {
    id: 'mediumPrinter',
    shortId: 'mp',
    power: -2,
    recipe: {
      compound: 2,
    },
  },
].map(it => ({ ...it, tier: Tier.MEDIUM, size: DefaultSize.MEDIUM }));
