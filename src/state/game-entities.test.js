import reducer, {
  setGameObjects,
  addGameObject,
  updateGameObject,
  deleteGameObject,
} from './game-entities';

test('identity', () => {
  const a = { type: 'asd' };
  const r = reducer({}, a);
  const e = { entities: [] };

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

  test('addGameObject', () => {
    const a = addGameObject({ id: 'qtRtg' });
    const r = reducer({}, a);
    const e = { entities: [{ id: 'qtRtg' }] };

    expect(r).toEqual(e);
  });

  describe('updateGameObject', () => {
    test('insert if object not in list', () => {
      const a = updateGameObject({ id: 'qtRtg' });
      const r = reducer({}, a);
      const e = { entities: [{ id: 'qtRtg' }] };

      expect(r).toEqual(e);
    });

    test('update existing object', () => {
      const a = updateGameObject({ id: 'qtRtg', power: 1 });
      const r = reducer({ entities: [{ id: 'qtRtg', power: 123 }] }, a);
      const e = { entities: [{ id: 'qtRtg', power: 1 }] };

      expect(r).toEqual(e);
    });
  });

  describe('deleteGameObject', () => {
    test('delete existing object', () => {
      const a = deleteGameObject({ id: 'qtRtg' });
      const r = reducer({ entities: [{ id: 'qtRtg' }] }, a);
      const e = { entities: [] };

      expect(r).toEqual(e);
    });

    test('delete nonexistent object', () => {
      const a = deleteGameObject({ id: 'asd' });
      const r = reducer({ entities: [{ id: 'qtRtg' }] }, a);
      const e = { entities: [{ id: 'qtRtg' }] };

      expect(r).toEqual(e);
    });

    test('delete from empty state', () => {
      const a = deleteGameObject({ id: 'qtRtg' });
      const r = reducer({}, a);
      const e = { entities: [] };

      expect(r).toEqual(e);
    });
  });
});
