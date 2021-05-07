import { actions, preventDefault, stopPropagation } from '../util';

describe('common/util', () => {
  test('actions', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const fn3 = jest.fn();

    actions(fn1, fn2, fn3)({});

    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    expect(fn3).toHaveBeenCalled();
  });

  describe('events', () => {
    test('preventDefault', () => {
      const e = { preventDefault: jest.fn() };
      preventDefault(e);

      expect(e.preventDefault).toHaveBeenCalled();
    });

    test('stopPropagation', () => {
      const e = { stopPropagation: jest.fn() };
      stopPropagation(e);

      expect(e.stopPropagation).toHaveBeenCalled();
    });
  });
});