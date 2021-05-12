import {
  actions,
  preventDefault,
  stopPropagation,
  createPrefixedAction,
  thru,
} from '../util';

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

  describe('functions', () => {
    test('thru', () => {
      const fn1 = jest.fn(a => b => [a, b]);
      const fn2 = jest.fn(b => a => [a, b]);

      const output = thru(1, fn1(2), fn2(2));
      expect(output).toEqual([[2, 1], 2]);
      // It's composed left-to-right
      expect(fn1).toHaveBeenCalledBefore(fn2);
    });
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

  describe('actions', () => {
    test('createPrefixedAction', () => {
      const pre = 'foo';
      const mkAction = createPrefixedAction(pre);

      const a1 = mkAction('bar');
      expect(a1()).toEqual({ type: 'foo/bar' });

      const fn2 = jest.fn(x => ({ payload: x }));
      const a2 = mkAction('baz', fn2);

      expect(a2(123)).toEqual({ type: 'foo/baz', payload: 123 });
      expect(fn2).toHaveBeenCalled();
    });
  });
});
