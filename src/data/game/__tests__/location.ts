import { Location } from '../location';

it('works as a data constructor', () => {
  const i1 = {
    id: 'sylva',
    difficulty: 0,
    power: { solar: 0, wind: 0 },
    cycle: 360,
  };

  const a1 = new Location(i1);
  expect(a1).toBeInstanceOf(Location);

  expect(JSON.parse(JSON.stringify(a1))).toEqual({
    id: 'sylva',
    difficulty: 0,
    power: { solar: 0, wind: 0 },
    cycle: 360,
  });
});

it('gives a nice string representation', () => {
  const i1 = new Location({
    id: 'sylva',
    difficulty: 0,
    power: { solar: 0, wind: 0 },
    cycle: 360,
  });

  const o1 = i1.toString();

  expect(o1).toBe(
    'Location(id=sylva, difficulty=0, power=[object Object], cycle=360)',
  );
});
