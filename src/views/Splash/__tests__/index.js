import { render } from 'test-utils';
import { Splash } from '../index';

test('Splash', () => {
  const { container } = render(<Splash />);

  // expect(container).toMatchSnapshot();
});
