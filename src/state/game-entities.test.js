import reducer, { setGameObjects } from './game-entities';

test('setGameObjects', () => {
  const a = setGameObjects([{ id: 'qtRtg' }, { id: 'rtg' }]);
  const r = reducer({}, a);
  const e = {
    ids: ['qtRtg', 'rtg'],
    entities: { qtRtg: { id: 'qtRtg' }, rtg: { id: 'rtg' } },
  };

  expect(r).toEqual(e);
});
