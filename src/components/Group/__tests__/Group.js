import { render } from '@testing-library/react';
import { Group } from '../Group';

describe('Group', () => {
  it('should have an accessible title', async () => {
    const { findByRole } = render(<Group title="Foo">Bar</Group>);

    expect(await findByRole('banner', { name: /foo/i })).toHaveTextContent(
      'Foo',
    );
  });
});
