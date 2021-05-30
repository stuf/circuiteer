import { render, fireEvent, logRoles, logDOM } from '@testing-library/react';
import { Dropdown } from '../Dropdown';

test('Dropdown', async () => {
  const onChange = jest.fn();
  const props = {
    choices: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ],
    onChange,
  };

  const { container, findByRole } = render(<Dropdown {...props} />);

  const input = await findByRole('combobox');

  fireEvent.change(input, { target: { value: 'two' } });

  expect(onChange).toHaveBeenCalled();
  expect(input.value).toBe('two');

  expect(container).toMatchSnapshot();
});
