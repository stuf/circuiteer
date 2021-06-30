import { render, logRoles, fireEvent } from '@testing-library/react';

import { Dropdown } from './Dropdown';

test('Dropdown', () => {
  const fn = jest.fn();
  const { container } = render(
    <Dropdown id="test" choices={[{ id: 1 }]} renderChoice={fn} />,
  );

  expect(fn).toHaveBeenCalled();
});
