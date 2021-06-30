import { render, act, fireEvent, logRoles } from '@testing-library/react';

import { Entity } from './Entity';

test('Entity', async () => {
  const fn = jest.fn();
  const { container, findByRole } = render(
    <Entity object={{ entity: {} }} onDelete={fn} />,
  );

  const button = await findByRole('button', { name: 'ui:delete' });

  act(() => {
    fireEvent.click(button);
  });

  expect(fn).toHaveBeenCalled();
});
