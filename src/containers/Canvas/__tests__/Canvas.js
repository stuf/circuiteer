import { logDOM, logRoles } from '@testing-library/react';
import { render } from 'test-utils';
import { Canvas } from '../Canvas';

describe('Canvas', () => {
  test('works', () => {
    const { container } = render(<Canvas />);

    expect(container).toMatchSnapshot();
  });
});
