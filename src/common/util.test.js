import * as I from 'infestines';

import * as U from './util';

describe('U.actions', () => {
  test('nullary', () => {
    expect(U.actions(undefined)).toBe(undefined);
  });

  test('variadic', () => {
    const i1 = 'called 1';
    const fn1 = jest.fn();
    U.actions(fn1)(i1);

    const i2 = 'called 2';
    const fn2 = jest.fn();
    U.actions(fn2, fn2)(i2);

    const i3 = 'called 3';
    const fn3 = jest.fn();
    U.actions(fn3, fn3, fn3)(i3);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(i1);

    expect(fn2).toHaveBeenCalledTimes(2);
    expect(fn2).toHaveBeenCalledWith(i2);

    expect(fn3).toHaveBeenCalledTimes(3);
    expect(fn3).toHaveBeenCalledWith(i3);
  });

  test('with non-functions', () => {
    const arg1 = [0, '', null, undefined, '123', {}, []];
    const res1 = U.actions(...arg1);

    expect(res1).toBe(undefined);

    const arg2 = [jest.fn(), null, undefined, jest.fn()];
    const res2 = U.actions(...arg2);

    expect(I.isFunction(res2)).toBe(true);
    res2('called');

    expect(arg2[0]).toHaveBeenCalledTimes(1);
    expect(arg2[arg2.length - 1]).toHaveBeenCalledTimes(1);
  });
});

test('U.preventDefault', () => {
  const fn = jest.fn();
  U.preventDefault({ preventDefault: fn });

  expect(fn).toHaveBeenCalled();
});

test('U.persist', () => {
  const fn = jest.fn();
  U.persist({ persist: fn });

  expect(fn).toHaveBeenCalled();
});

describe('Store', () => {
  test('U.createPrefixedActionCreator', () => {
    const prefix = 'prefix';
    const createAction = U.createPrefixedActionCreator(prefix);

    expect(createAction).toBeInstanceOf(Function);

    const a1 = createAction('actionType');
    expect(a1(123)).toEqual({ type: `${prefix}/actionType`, payload: 123 });
  });

  test('U.normalize', () => {
    const xs = [{ id: '1' }, { id: '2' }];
    const r = U.normalize(xs);
    const e = { ids: ['1', '2'], entities: { 1: { id: '1' }, 2: { id: '2' } } };

    expect(r).toEqual(e);
  });

  test('U.denormalize', () => {
    const o = { ids: ['1', '2'], entities: { 1: { id: '1' }, 2: { id: '2' } } };
    const r = U.denormalize(o);
    const e = [{ id: '1' }, { id: '2' }];

    expect(r).toEqual(e);
  });
});
