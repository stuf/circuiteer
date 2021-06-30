import { render, fireEvent, logRoles } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { Checkbox } from './Checkbox';

test('Checkbox', async () => {
  const fn = jest.fn();
  const { debug, container, findByRole } = render(
    <Checkbox id="label" label="Label" onChange={fn} />,
  );

  // logRoles(container);

  const el = await findByRole('checkbox');
  act(() => {
    fireEvent.change(el);
  });

  // expect(fn).toHaveBeenCalled();
});
