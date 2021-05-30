import {
  render,
  createEvent,
  fireEvent,
  logDOM,
  logRoles,
} from '@testing-library/react';
import { Button } from '../Button';
import { suppressPropTypeWarnings } from 'test-utils';

suppressPropTypeWarnings();

test('renders with sensible defaults', () => {
  render(<Button />);
});

it('uses label as text, otherwise children', async () => {
  const { findAllByText } = render(
    <>
      <Button label="Label">Children</Button>
      <Button label="">Children</Button>
    </>,
  );

  expect(await findAllByText('Children')).toHaveLength(1);
  expect(await findAllByText('Label')).toHaveLength(1);
});

it('should not throw when clicking without any given onClick handler', async () => {
  const { findByRole } = render(<Button />);
  const a = await findByRole('button');

  const ev = createEvent.click(a);
  expect(() => fireEvent(a, ev)).not.toThrow();
});

it('should call the given onClick handler when clicked', async () => {
  const fn = jest.fn();
  const { findByRole } = render(<Button onClick={fn} />);

  const el = await findByRole('button');

  fireEvent(el, createEvent.click(el));

  expect(fn).toHaveBeenCalled();
});

it('supports different sizes, types and icons', async () => {
  const { container } = render(
    <>
      <Button icon="settings" label="Settings" />
      <Button icon="settings">Settings</Button>
      <Button icon="settings" label="Settings"></Button>
    </>,
  );

  expect(container).toMatchSnapshot();
});
