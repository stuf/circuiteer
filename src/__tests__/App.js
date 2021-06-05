import { render } from 'test-utils';
import App from '../App';

describe('App', () => {
  test('basic smoke test', () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });
});
