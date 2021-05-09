import reducer, { toggleSplashScreen } from '../application';

describe('state/application', () => {
  test('reducer does no-op on unhandled actions', () => {
    const r = reducer({}, {});
    expect(r).toEqual({});

    const r2 = reducer({}, { type: 'foo' });
    expect(r2).toEqual({});
  });

  describe('actions', () => {
    test('toggleSplashScreen', () => {
      const a = toggleSplashScreen();
      const r = reducer({}, a);
      const e = { splash: { show: true } };

      expect(r).toEqual(e);
    });
  });
});
