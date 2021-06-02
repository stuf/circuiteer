import { fireEvent, act, logRoles, screen } from '@testing-library/react';
import { render } from 'test-utils';

import { Toolbar } from '../Toolbar';

describe('Toolbar', () => {
  test('exposes an accessible toolbar', async () => {
    const { container, findAllByRole, findByRole, findByLabelText } = render(
      <Toolbar />,
    );

    await findByRole('menu');
    await findAllByRole('menuitem');

    const b1 = await findByLabelText(/import/i);
    const b2 = await findByLabelText(/export/i);

    act(() => {
      fireEvent.click(b1);
      fireEvent.click(b2);
    });

    // logRoles(container);
  });
});
