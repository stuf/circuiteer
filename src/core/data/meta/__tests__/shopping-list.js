import { shoppingList } from '../shopping-list';

const warn = console.warn.bind(console.warn);

test('shoppingList', () => {
  const fn = jest.fn();
  console.warn = fn;

  const modules = ['mediumPrinter', 'mediumPrinter', 'largePrinter'];

  const res = shoppingList(modules);

  expect(res).toEqual({ compound: 7 });

  const res2 = shoppingList(['asd']);

  // This is kinda hacky, no like
  expect(fn).toHaveBeenCalled();
  expect(res2).toEqual({});

  console.warn = warn;
});
