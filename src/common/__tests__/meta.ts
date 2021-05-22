import { stringRepr } from '../meta';

it('stringRepr', () => {
  const i1 = stringRepr('Foo', { a: 1, b: 2 });
  expect(i1).toBe('Foo(a=1, b=2)');
});
