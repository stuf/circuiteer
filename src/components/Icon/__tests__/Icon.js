import { render } from '@testing-library/react';
import { Icon } from '../Icon';

describe('Icon', () => {
  test('base case', async () => {
    const props = {
      name: 'settings',
    };

    const { container } = render(<Icon {...props} />);

    expect(container).toMatchSnapshot();
  });

  test('custom size', async () => {
    const props = {
      name: 'settings',
      size: 16,
    };

    const { container } = render(<Icon {...props} />);

    expect(container).toMatchSnapshot();
  });
});
