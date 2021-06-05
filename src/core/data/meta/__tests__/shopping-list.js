import { shoppingList } from '../shopping-list';

const warn = console.warn.bind(console.warn);

afterEach(() => {
  console.warn = warn;
});

test('shoppingList', () => {
  const fn = jest.fn();
  console.warn = fn;

  const modules = ['mediumPrinter', 'mediumPrinter', 'largePrinter'];

  const res = shoppingList(modules);

  expect(res).toEqual({ compound: 7 });

  const res2 = shoppingList(['asd']);

  expect(res2).toEqual({});

  // It should warn with an unknown module (non-production)
  shoppingList(['asd']);
  expect(fn).toHaveBeenCalled();
});
