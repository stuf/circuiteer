import { render, logRoles } from '@testing-library/react';
import { ShoppingList } from '../ShoppingList';

test('ShoppingList', async () => {
  const props = {
    entities: [{ module: 'smallWindTurbine' }],
  };

  const { container } = render(<ShoppingList {...props} />);

  expect(container).toMatchSnapshot();
});
