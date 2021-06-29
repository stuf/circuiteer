import reducer, { toggleFlag, setFlag, setFlags } from './options';

test('identity', () => {
  const a = { type: 'asd' };
  const r = reducer({}, a);
  const e = {};

  expect(r).toEqual(e);
});

describe('actions', () => {
  test('toggleFlag', () => {
    const a = toggleFlag('someFlag');
    const r = reducer({}, a);
    const e = { flags: { someFlag: true } };

    const r2 = reducer(e, a);
    const e2 = { flags: { someFlag: false } };

    expect(r).toEqual(e);
    expect(r2).toEqual(e2);
  });

  test('setFlag', () => {
    const a = setFlag({ flag: 'foo', value: true });
    const r = reducer({}, a);
    const e = { flags: { foo: true } };

    const a2 = setFlag({ flag: 'bar', value: false });
    const r2 = reducer(r, a2);
    const e2 = { flags: { foo: true, bar: false } };

    expect(r).toEqual(e);
    expect(r2).toEqual(e2);
  });

  test('setFlags', () => {
    const a = setFlags({ foo: true, bar: false });
    const r = reducer({ flags: { something: true, here: false } }, a);
    const e = {
      flags: { foo: true, bar: false, something: true, here: false },
    };

    expect(r).toEqual(e);
  });
});
