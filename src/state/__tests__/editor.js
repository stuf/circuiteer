import reducer, { addEntity } from '../editor';

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
  });
});
