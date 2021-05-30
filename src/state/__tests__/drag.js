import reducer, {
  setDrag,
  setDragPos,
  setDragSize,
  setDragging,
} from '../drag';

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

    test('setDragPos', () => {
      expect(reducer({}, setDragPos([1, 2]))).toEqual({ pos: [1, 2] });
    });

    test('setDragSize', () => {
      expect(reducer({}, setDragSize([1, 2]))).toEqual({ size: [1, 2] });
    });

    test('setDragging', () => {
      expect(reducer({}, setDragging(true))).toEqual({ dragging: true });
    });
  });
});
