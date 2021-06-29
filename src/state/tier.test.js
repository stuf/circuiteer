import reducer, { setTiers, setCurrentTier } from './tier';

test('identity', () => {
  const a = { type: 'foo' };
  const r = reducer({}, a);
  const e = {};

  expect(r).toEqual(e);
});

describe('actions', () => {
  test('setTiers', () => {
    const a = setTiers([
      { id: 1, name: 'small' },
      { id: -1, name: 'other' },
    ]);
    const r = reducer({}, a);
    const e = {
      current: null,
      tiers: [
        { id: 1, name: 'small' },
        { id: -1, name: 'other' },
      ],
    };

    expect(r).toEqual(e);
  });

  test('setCurrentTier', () => {
    const a = setCurrentTier(1);
    const r = reducer({}, a);
    const e = { current: 1, tiers: [] };

    expect(r).toEqual(e);
  });
});
