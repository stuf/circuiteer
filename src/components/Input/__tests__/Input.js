import { render, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
  test('works as normal', async () => {
    const onChange = jest.fn();
    const props = {
      id: 'foo',
      label: 'Is this foo?',
      placeholder: 'Placeholder gates of content',
      onChange,
    };

    const { container, findByLabelText, findByRole } = render(
      <Input {...props} />,
    );

    const input = await findByRole('textbox');

    fireEvent.change(input, { target: { value: 'foobar' } });

    expect(input.value).toBe('foobar');
    expect(onChange).toHaveBeenCalled();

    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
    expect(input.type).toBe('text');

    await findByLabelText(/is this foo\?/i);
  });

  it('can be used without a label', async () => {
    const props = {
      id: 'foo',
    };

    const { container, findByRole } = render(<Input {...props} />);

    await findByRole('textbox');
  });

  it('can be disabled', async () => {
    const props = { id: 'foo', label: 'Is this foo?', disabled: true };
    const { container, findByRole } = render(<Input {...props} />);

    const input = await findByRole('textbox');

    expect(input.disabled).toBe(true);
  });

  it('can be made read-only', async () => {
    const props = {
      id: 'foo',
      label: 'Is this read-only foo?',
      readOnly: true,
    };

    const { container, findByRole } = render(<Input {...props} />);

    const input = await findByRole('textbox', {
      name: /is this read-only foo\?/i,
    });

    expect(input.readOnly).toBe(true);
  });

  it('can be a multi-line textarea', async () => {
    const onChange = jest.fn();

    const props = {
      type: 'textarea',
      id: 'multi-foo',
      rows: 10,
      onChange,
    };

    const { container, findByRole } = render(<Input {...props} />);

    const input = await findByRole('textbox');
    expect(input.tagName).toBe('TEXTAREA');
  });
});
