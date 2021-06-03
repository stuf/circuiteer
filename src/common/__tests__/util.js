import {
  actions,
  debounce,
  preventDefault,
  stopPropagation,
  createPrefixedAction,
  thru,
  screenToGrid,
  gridToScreen,
  invokeIf,
  construct0,
  construct1,
  construct2,
} from '../util';
import { MockClass, ctor } from '../mock';

jest.mock('../mock');

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

    test('debounce', done => {
      const fn1 = jest.fn(() => done());
      const def1 = debounce(fn1, 1);

      def1(123);

      expect(def1.name).toBe(`debounced<${fn1.name}>`);
    });

    describe('Class', () => {
      beforeEach(() => {
        ctor.mockClear();
      });

      test('construct0', () => {
        const r = construct0(MockClass)(1, 2, 3);

        expect(r).toBeTruthy();
        expect(ctor).toHaveBeenCalledWith();
      });

      test('construct1', () => {
        const r = construct1(MockClass)(1, 2, 3);
        expect(r).toBeTruthy();
        expect(ctor).toHaveBeenCalledWith(1);
      });

      test('construct2', () => {
        const r = construct2(MockClass)(1, 2, 3);
        expect(r).toBeTruthy();
        expect(ctor).toHaveBeenCalledWith(1, 2);
      });
    });
  });

  describe('conversion', () => {
    test('screenToGrid', () => {
      const gxy = [4, 4];
      expect(screenToGrid(gxy, [4, 4])).toEqual([1, 1]);
    });

    test('gridToScreen', () => {
      const gxy = [4, 4];
      expect(gridToScreen(gxy, [4, 4])).toEqual([16, 16]);
    });
  });

  describe('functions 123', () => {
    test('invokeIf', () => {
      const id = a => a;
      const fn1 = jest.fn(id);
      const fn2 = jest.fn(id);

      const x = invokeIf(123, fn1);
      const y = invokeIf(123, undefined);

      const z = invokeIf(123);

      expect(fn1).toHaveBeenCalled();
      expect(x).toBe(123);
      expect(y).toBeUndefined();

      expect(z).toBeInstanceOf(Function);
      expect(fn2).not.toHaveBeenCalled();
      const z_ = z(fn2);
      expect(z_).toBe(123);
      expect(fn2).toHaveBeenCalled();
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
