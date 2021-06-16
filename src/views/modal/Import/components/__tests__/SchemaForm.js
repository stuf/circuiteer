import { act, screen, cleanup, fireEvent } from '@testing-library/react';
import { render } from 'test-utils';
import { SchemaForm } from '../SchemaForm';

afterEach(() => {
  cleanup();
});

describe('SchemaForm', () => {
  it('has accessible parts of the UI', async () => {
    const props = {
      schemaName: 'import',
    };

    act(() => {
      render(<SchemaForm {...props} />);
    });

    const textarea = await screen.findByRole('textbox', { name: /import/i });

    expect(screen.queryByRole('region', { name: /invalidJsonSyntax/i })).toBe(
      null,
    );

    act(() => {
      fireEvent.change(textarea, { target: { value: '{ "a": 1 ' } });
    });

    expect(
      screen.queryByRole('region', { name: /invalidJsonSyntax/i }),
    ).not.toBe(null);
  });

  it('causes validation errors on nonconforming data', async () => {
    const { queryAllByRole, findByRole } = render(
      <SchemaForm {...{ schemaName: 'import', data: [{ foo: 1, bar: 2 }] }} />,
    );

    const textarea = await findByRole('textbox', { name: /import/i });

    act(() => {
      fireEvent.change(textarea, { target: { value: '{ "asd": 123 }' } });
    });

    const errors = queryAllByRole('listitem');

    expect(errors).toHaveLength(1);
  });

  it('has no errors with valid input', async () => {
    const { queryAllByRole } = render(
      <SchemaForm
        {...{ schemaName: 'import', data: { version: '0.1.0', entities: [] } }}
      />,
    );

    expect(queryAllByRole('listitem')).toHaveLength(0);
  });

  it('calls custom onChange callback', async () => {
    const fn = jest.fn();
    const { container, findByRole } = render(
      <SchemaForm schemaName="asd" onChange={fn} />,
    );

    const textarea = await findByRole('textbox');
    fireEvent.change(textarea, { target: { value: '123' } });
  });
});
