import reducer, { setGridSize, toggleGrid } from '../grid';

describe('state/grid', () => {
  test('reducer does no-op on unhandled actions', () => {
    const r = reducer({}, {});
    expect(r).toEqual({});

    const r2 = reducer({}, { type: 'foo' });
    expect(r2).toEqual({});
  });

  describe('actions', () => {
    test('setGridSize', () => {
      expect(reducer({}, setGridSize([24, 24]))).toEqual({ size: [24, 24] });
    });

    test('toggleGrid', () => {
      expect(reducer({}, toggleGrid())).toEqual({ show: true });
      expect(reducer({ show: true }, toggleGrid())).toEqual({ show: false });
    });
  });
});
