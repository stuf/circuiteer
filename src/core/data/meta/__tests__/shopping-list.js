import { shoppingList } from '../shopping-list';

test('shoppingList', () => {
  const modules = ['mediumPrinter', 'mediumPrinter', 'largePrinter'];

  const res = shoppingList(modules);

  expect(res).toEqual({ compound: 7 });
});
