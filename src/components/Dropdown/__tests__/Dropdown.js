import { render, fireEvent, logRoles, logDOM } from '@testing-library/react';
import { Dropdown } from '../Dropdown';

describe('Dropdown', () => {
  it('works as default', async () => {
    const onChange = jest.fn();
    const props = {
      choices: [
        { label: 'One', value: 'one' },
        { label: 'Two', value: 'two' },
      ],
      onChange,
    };

    const { container, findByRole } = render(
      <Dropdown id="dropdown" {...props} />,
    );

    const input = await findByRole('combobox');

    fireEvent.change(input, { target: { value: 'two' } });

    expect(onChange).toHaveBeenCalled();
    expect(input.value).toBe('two');

    expect(container).toMatchSnapshot();
  });

  it('can be disabled', async () => {
    const props = {
      choices: [],
      disabled: true,
      onChange: () => {},
    };

    const { container, findByRole } = render(
      <Dropdown id="dropdown" {...props} />,
    );

    expect(await findByRole('combobox')).toBeDisabled();
  });
});
