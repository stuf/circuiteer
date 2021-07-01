import * as L from 'partial.lenses';
import U from 'util';
import reducer, {
  addObject,
  addObjects,
  deleteObject,
  setObjects,
  updateObject,
  lockObject,
  enableObject,
  disableObject,
  unlockObject,
} from './objects';

import { objectL, stateL, findObjectL } from './lenses/objects';

import { replayState, show } from 'common/testutil';

describe('reducer', () => {
  test('identity', () => {
    const a = { type: 'asd' };
    const r = reducer({}, a);
    const e = { entities: [] };

    expect(r).toEqual(e);
  });
});

describe('lenses', () => {
  test('stateL', () => {
    expect(L.get(stateL, null)).toEqual({ entities: [] });
  });

  test('objectL', () => {
    expect(L.get(objectL, null)).toEqual({ locked: false, disabled: false });
  });

  test('findObjectL', () => {
    const s1 = { entities: [{ id: '123' }] };
    const se = { entities: [] };

    const objL = findObjectL('123');

    expect(L.get(objL, s1)).toEqual({ id: '123' });
    expect(L.get(objL, se)).toBeUndefined();

    expect(L.set(objL, { id: '234' }, s1)).toEqual({
      entities: [{ id: '234' }],
    });

    expect(L.set(objL, { id: '123' }, se)).toEqual({
      entities: [{ id: '123' }],
    });
  });
});

describe('actions', () => {
  test('addObject', () => {
    const a = addObject({ id: '1' });
    const r = reducer({ entities: [{ id: '2' }] }, a);
    const e = { entities: [{ id: '2' }, { id: '1' }] };

    expect(r).toEqual(e);
  });

  test('addObjects', () => {
    const a = addObjects([{ id: '1' }, { id: '2' }, { id: '3' }]);

    const r = reducer({ entities: [{ id: '0' }] }, a);

    const e = {
      entities: [{ id: '0' }, { id: '1' }, { id: '2' }, { id: '3' }],
    };

    expect(r).toEqual(e);
  });

  test('setObjects', () => {
    const a = setObjects([{ id: '1' }]);
    const r = reducer({ entities: [{ id: '123' }] }, a);
    const e = {
      entities: [{ id: '1' }],
    };

    expect(r).toEqual(e);
  });

  describe('updateObject', () => {
    test('update nonexistent -> insert', () => {
      const a = updateObject({ id: '1', name: 'turbokakn' });
      const r = reducer({}, a);
      const e = { entities: [{ id: '1', name: 'turbokakn' }] };

      expect(r).toEqual(e);
    });

    test('update existing', () => {
      const a = updateObject({ id: '1', name: 'turbokakn' });
      const r = reducer(
        {
          entities: [
            { id: '-1', foo: true },
            { id: '1', foo: true },
          ],
        },
        a,
      );
      const e = {
        entities: [
          { id: '-1', foo: true },
          { id: '1', name: 'turbokakn', foo: true },
        ],
      };

      expect(r).toEqual(e);
    });
  });

  test('deleteObject', () => {
    const a = deleteObject({ id: '1' });
    const r = reducer({ entities: [{ id: '1' }, { id: '2' }] }, a);
    const e = { entities: [{ id: '2' }] };

    expect(r).toEqual(e);
  });

  describe('lock', () => {
    test('lockObject', () => {
      const a = lockObject({ id: '1' });
      const r = reducer({ entities: [{ id: '1' }] }, a);
      const e = { entities: [{ id: '1', locked: true, disabled: false }] };

      expect(r).toEqual(e);
    });

    test('unlockObject', () => {
      const a = unlockObject({ id: '1' });
      const r = reducer({ entities: [{ id: '1' }] }, a);
      const e = { entities: [{ id: '1', locked: false, disabled: false }] };

      expect(r).toEqual(e);
    });
  });

  describe('disable', () => {
    test('enableObject', () => {
      const a = enableObject({ id: '1' });
      const r = reducer({ entities: [{ id: '1', disabled: true }] }, a);
      const e = { entities: [{ id: '1', disabled: false, locked: false }] };

      expect(r).toEqual(e);
    });

    test('disableObject', () => {
      const a = disableObject({ id: '1' });
      const r = reducer({ entities: [{ id: '1', disabled: false }] }, a);
      const e = { entities: [{ id: '1', disabled: true, locked: false }] };

      expect(r).toEqual(e);
    });
  });
});
