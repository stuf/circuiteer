import { PowerType } from '../powertype';
import { Tier } from '../tier';
import { DefaultSize } from '../../../config';

/**
 * @type {IModule[]}
 */
export const medium = [
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
