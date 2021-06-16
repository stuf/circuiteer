import { stopEntityMove } from 'state/editor';
import { moveEntityDelta } from 'state/editor';
import { importEntities } from 'state/editor';
import { deleteEntity } from 'state/editor';
import { moveEntity } from 'state/editor';
import { startEntityMove } from 'state/editor';
import reducer, {
  addEntity,
  selectEntity,
  resetCurrent,
  toggleEntity,
} from '../editor';

describe('state/editor', () => {
  test('reducer does no-op on unhandled actions', () => {
    const r = reducer({}, {});
    expect(r).toEqual({});

    const r2 = reducer({}, { type: 'foo' });
    expect(r2).toEqual({});
  });

  describe('actions', () => {
    describe('importEntities', () => {
      test('empty', () => {
        const a1 = importEntities([]);
        expect(a1.payload).toEqual([]);

        const r1 = reducer({}, a1);
        const e1 = { entities: [] };
        expect(r1).toEqual(e1);
      });

      test('normalize imported (autogenerate uuid if no id)', () => {
        const a = importEntities([{}, { id: 123 }, {}]);
        // console.log(a);
      });
    });

    test('addEntity', () => {
      // Adding an entity without an ID generates an ID for it
      const a1 = addEntity();
      expect(a1.payload.id).not.toBeUndefined();

      // Adding an entity with an ID doesn't regenerate its ID
      const a2 = addEntity({ id: '123' });
      expect(a2.payload.id).toBe('123');

      expect(reducer({}, a1)).toEqual({ entities: [a1.payload] });
      expect(reducer({}, a2)).toEqual({ entities: [a2.payload] });
    });

    test('deleteEntity', () => {
      const a = deleteEntity({ id: 123 });
      const r = reducer(
        {
          entities: [
            { id: 123, foo: 1 },
            { id: 124, bar: 2 },
          ],
        },
        a,
      );
      const e = { entities: [{ id: 124, bar: 2 }] };

      expect(a.payload).not.toBeUndefined();
      expect(r).toEqual(e);
    });

    test('deleteEntity (invalid, no-op)', () => {
      const a = deleteEntity();
      const r = reducer({}, a);
      const e = {};

      expect(r).toEqual(e);
    });

    test('selectEntity', () => {
      const a = selectEntity('123');
      const r = reducer({}, a);
      const e = { current: '123' };

      expect(r).toEqual(e);
    });

    test('resetCurrent', () => {
      const a = resetCurrent();
      const r = reducer({ current: '123' }, a);
      const e = {};

      expect(r).toEqual(e);
    });

    test('toggleEntity', () => {
      const a = toggleEntity('123');
      const r = reducer({ entities: [{ id: '123' }] }, a);
      const e = { entities: [{ id: '123', enabled: true }] };

      expect(r).toEqual(e);
    });

    test('startEntityMove', () => {
      const a = startEntityMove({ id: '123' });
      const r = reducer({ entities: [{ id: '123' }, { id: '234' }] }, a);
      const e = { entities: [{ id: '123', moving: true }, { id: '234' }] };

      expect(r).toEqual(e);
    });

    test('stopEntityMove', () => {
      const a = stopEntityMove({ id: '123' });
      const r = reducer({ entities: [{ id: '123', moving: true }] }, a);
      const e = { entities: [{ id: '123', moving: false }] };

      expect(r).toEqual(e);
    });

    test('stopEntityMove (invalid, no-op)', () => {
      const a = stopEntityMove({ id: '123' });
      const r = reducer({}, a);
      const e = {};

      expect(r).toEqual(e);
    });

    test('moveEntity', () => {
      const a = moveEntity({ id: '123', pos: [4, 0] });
      const r = reducer({ entities: [{ id: '123', pos: [2, 0] }] }, a);
      const e = { entities: [{ id: '123', pos: [4, 0] }] };

      expect(r).toEqual(e);
    });

    test('moveEntity (invalid, no-op)', () => {
      const a = moveEntity({ id: '123', pos: [4, 0] });
      const r = reducer({}, a);
      const e = {};

      expect(r).toEqual(e);
    });

    test('moveEntityDelta', () => {
      const a = moveEntityDelta({ id: '123', pos: [4, 2] });
      const r = reducer({ entities: [{ id: '123', pos: [4, 2] }] }, a);
      const e = { entities: [{ id: '123', pos: [8, 4] }] };

      expect(r).toEqual(e);
    });

    test('moveEntityDelta (invalid, no-op)', () => {
      const a = moveEntityDelta({ id: '123', pos: [4, 2] });
      const r = reducer({}, a);
      const e = {};

      expect(r).toEqual(e);
    });
  });
});
