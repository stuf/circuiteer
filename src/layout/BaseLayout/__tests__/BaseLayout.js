import { render } from '@testing-library/react';
import { BaseLayout } from '../BaseLayout';

describe('BaseLayout', () => {
  test('works', () => {
    const { container } = render(<BaseLayout />);

    expect(container).toMatchSnapshot();
  });
});
