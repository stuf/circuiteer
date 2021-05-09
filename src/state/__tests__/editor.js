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
    test('addEntity', () => {
      // Adding an entity without an ID generates an ID for it
      const a1 = addEntity();
      expect(a1.payload.id).not.toBeUndefined();

      // Adding an entity with an ID doesn't regenerate its ID
      const a2 = addEntity({ id: '123' });
      expect(a2.payload.id).toBe('123');
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
  });
});
