import reducer, { setGameObjects } from './game-entities';

test('identity', () => {
  const a = { type: 'asd' };
  const r = reducer({}, a);
  const e = {};

  expect(r).toEqual(e);
});

describe('actions', () => {
  test('setGameObjects', () => {
    const a = setGameObjects([{ id: 'qtRtg' }, { id: 'rtg' }]);
    const r = reducer({}, a);
    const e = {
      entities: [{ id: 'qtRtg' }, { id: 'rtg' }],
    };

    expect(r).toEqual(e);
  });
});
