import {
  Difficulty,
  Location,
  LocationId,
  PowerEfficiency,
  mkLocation,
} from 'data/game/location';

const locations: Location[] = [
  {
    id: 'sylva',
    cycle: -1,
    difficulty: Difficulty.EASY,
    power: { solar: 1, wind: 1 },
  },
  {
    id: 'desolo',
    cycle: 115,
    difficulty: Difficulty.EASY,
    power: { solar: PowerEfficiency.HIGH, wind: PowerEfficiency.LOW },
  },
  {
    id: 'calidor',
    cycle: 810,
    difficulty: Difficulty.MEDIUM,
    power: { solar: PowerEfficiency.VERY_HIGH, wind: PowerEfficiency.LOW },
  },
  {
    id: 'vesania',
    cycle: 810,
    difficulty: Difficulty.MEDIUM,
    power: { solar: PowerEfficiency.LOW, wind: PowerEfficiency.HIGH },
  },
  {
    id: 'novus',
    cycle: 210,
    difficulty: Difficulty.MEDIUM,
    power: { solar: PowerEfficiency.HIGH, wind: PowerEfficiency.HIGH },
  },
  {
    id: 'glacio',
    cycle: [1200, 60],
    difficulty: Difficulty.HARD,
    power: { solar: PowerEfficiency.VERY_LOW, wind: PowerEfficiency.VERY_HIGH },
  },
  {
    id: 'atrox',
    cycle: [1200, 60],
    difficulty: Difficulty.VERY_HARD,
    power: { solar: PowerEfficiency.LOW, wind: PowerEfficiency.LOW },
  },
].map(o => mkLocation(o as Location));

export const LocationDict = locations.reduce(
  (o, loc) => ({ ...o, [loc.id]: loc }),
  {} as Record<LocationId, Location>,
);

export { locations };
