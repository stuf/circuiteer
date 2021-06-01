import {
  act,
  screen,
  cleanup,
  waitFor,
  logRoles,
  logDOM,
  fireEvent,
  getByRole,
  getByText,
} from '@testing-library/react';
import { render } from 'test-utils';
import { SchemaForm } from '../SchemaForm';

import schema from 'schema/app/import';

afterEach(() => {
  cleanup();
});

describe('SchemaForm', () => {
  it('has accessible parts of the UI', async () => {
    const props = {
      schema,
    };

    act(() => {
      render(<SchemaForm {...props} />);
    });

    // const { container, debug, findByRole, queryByRole } = result;

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
    const { container, queryAllByRole, findByRole } = render(
      <SchemaForm {...{ schema, data: [{ foo: 1, bar: 2 }] }} />,
    );

    const textarea = await findByRole('textbox', { name: /import/i });

    act(() => {
      fireEvent.change(textarea, { target: { value: '{ "asd": 123 }' } });
    });

    const errors = await queryAllByRole('listitem');

    expect(errors).toHaveLength(2);
  });

  it('has no errors with valid input', async () => {
    const { container, queryAllByRole, findByRole } = render(
      <SchemaForm {...{ schema, data: { version: '0.1.0', entities: [] } }} />,
    );

    expect(queryAllByRole('listitem')).toHaveLength(0);
  });
});
