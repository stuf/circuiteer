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

it('should create a label text to the button', async () => {
  const { findByLabelText } = render(<Button label="label">children</Button>);

  await findByLabelText('label');
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
