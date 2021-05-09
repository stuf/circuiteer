import reducer from '../location';

describe('state/location', () => {
  test('reducer does no-op on unhandled actions', () => {
    const r = reducer({}, {});
    expect(r).toEqual({});

    const r2 = reducer({}, { type: 'foo' });
    expect(r2).toEqual({});
  });
});
