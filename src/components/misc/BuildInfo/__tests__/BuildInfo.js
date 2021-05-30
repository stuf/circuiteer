import { render, logDOM, screen } from '@testing-library/react';
import { BuildInfo } from '../BuildInfo';

const setEnv = (k, v) => Object.assign(process.env, { [k]: v });

beforeEach(() => {
  const { REACT_APP_appName, REACT_APP_commit, REACT_APP_branch, ...env } =
    process.env;

  process.env = env;
});

it('renders empty when it has nothing to show', () => {
  const result = render(<BuildInfo />);

  expect(result.container.children).toHaveLength(0);
});

it('renders appName when defined', async () => {
  setEnv('REACT_APP_appName', 'foo');
  const res = render(<BuildInfo />);

  expect((await res.findByText('foo')).textContent).toBe('foo');
  expect(res.container.textContent).toBe('foo');
});

it('renders the commit when defined', async () => {
  setEnv('REACT_APP_commit', '1234567890');
  const res = render(<BuildInfo />);
  const el = await res.findByText('12345678');
  const expected = '12345678';

  expect(el.textContent).toBe(expected);
  expect(res.container.textContent).toBe(expected);
});

it('renders the branch when defined', async () => {
  setEnv('REACT_APP_branch', 'foo');
  const res = render(<BuildInfo />);
  const el = await res.findByText('foo');
  const expected = 'foo';

  expect(el.textContent).toBe(expected);
  expect(res.container.textContent).toBe(expected);
});
