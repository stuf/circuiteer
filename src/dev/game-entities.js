import * as R from 'ramda';
import { DefaultSize } from 'common/defaults';

const mergeAllWith = (bo, o) => R.map(R.merge(bo), o);

const small = { tier: 1, size: DefaultSize[1] };
const medium = { tier: 2, size: DefaultSize[2] };
const large = { tier: 3, size: DefaultSize[3] };
const xlarge = { tier: 4, size: DefaultSize[4] };
const other = { tier: -1, size: DefaultSize[-1] };

const tierObjects = {
  small: [
    { id: 'qtRtg', power: 1, powerType: 'constant' },
    { id: 'smallBattery', power: 1, powerType: 'constant', capacity: 32 },
    { id: 'smallGenerator', power: 2, powerType: 'powered' },
    { id: 'smallSolarPanel', power: 1, powerType: 'solar' },
    { id: 'smallWindTurbine', power: 1.5, powerType: 'wind' },
    { id: 'powerCells', power: 1, powerType: 'powered' },
    { id: 'smallPrinter', power: -1, powerType: 'onDemand' },
    { id: 'portableOxygenator', power: -1, powerType: 'onDemand' },
  ],
  medium: [
    { id: 'autoArm', power: -1, powerType: 'onDemand' },
    { id: 'rtg', power: 4, powerType: 'constant' },
    { id: 'fieldShelter', power: 1, powerType: 'constant' },
    { id: 'mediumBattery', power: 5, powerType: 'powered', capacity: 512 },
    { id: 'mediumGenerator', power: 9, powerType: 'powered' },
    { id: 'mediumWindTurbine', power: 5, powerType: 'wind' },
    { id: 'mediumSolarPanel', power: 4, powerType: 'solar' },
    { id: 'mediumPrinter', power: -2, powerType: 'onDemand' },
    { id: 'mediumShredder', power: -5, powerType: 'onDemand' },
  ],
  large: [
    { id: 'largeSolarPanel', power: 8, powerType: 'solar' },
    { id: 'largeWindTurbine', power: 10, powerType: 'wind' },
    { id: 'largePrinter', power: -5, powerType: 'onDemand' },
    { id: 'smeltingFurnace', power: -5, powerType: 'onDemand' },
    { id: 'chemistryLab', power: -10, powerType: 'onDemand' },
    { id: 'soilCentrifuge', power: -6, powerType: 'onDemand' },
    { id: 'atmosphericCondenser', power: -20, powerType: 'onDemand' },
    { id: 'largeShredder', power: -7.5, powerType: 'onDemand' },
  ],
  extraLarge: [
    { id: 'autoExtractor', power: -8, powerType: 'onDemand' },
    { id: 'xlWindTurbine', power: 17, powerType: 'wind' },
    { id: 'solarArray', power: 14, powerType: 'solar' },
    { id: 'extraLargeShredder', power: -10, powerType: 'onDemand' },
    { id: 'shuttle', power: 0.1, powerType: 'constant' },
  ],
  other: [{ id: 'wreckedSolarArray', power: 64, powerType: 'solar' }],
};

export const objects = [
  mergeAllWith(small, tierObjects.small),
  mergeAllWith(medium, tierObjects.medium),
  mergeAllWith(large, tierObjects.large),
  mergeAllWith(xlarge, tierObjects.extraLarge),
  mergeAllWith(other, tierObjects.other),
].flat();
