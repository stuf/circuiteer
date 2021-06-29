import reducer, { toggleMenu } from './app';

test('identity', () => {
  const a = { type: 'asd' };
  const r = reducer({}, a);
  const e = {};

  expect(r).toEqual(e);
});

describe('actions', () => {
  test('toggleMenu', () => {
    const a = toggleMenu();
    const r = reducer({}, a);
    const e = { menu: { visible: true } };

    expect(r).toEqual(e);
  });
});
