import reducer, { setDrag } from '../drag';

describe('state/drag', () => {
  test('reducer does no-op on unhandled actions', () => {
    const r = reducer({}, {});
    expect(r).toEqual({});

    const r2 = reducer({}, { type: 'foo' });
    expect(r2).toEqual({});
  });

  describe('actions', () => {
    test('setDrag', () => {
      const a1 = setDrag({ dragging: true });
      const a2 = setDrag({ pos: [1, 1] });
      const a3 = setDrag({ size: [2, 2] });

      const r1 = reducer({}, a1);
      const r2 = reducer({}, a2);
      const r3 = reducer({}, a3);

      expect(r1).toEqual({ dragging: true });
      expect(r2).toEqual({ pos: [1, 1] });
      expect(r3).toEqual({ size: [2, 2] });
    });
  });
});
