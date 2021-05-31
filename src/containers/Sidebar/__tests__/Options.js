import { fireEvent } from '@testing-library/react';

import { render } from 'test-utils';
import SidebarOptions from '../Options';

describe('SidebarOptions', () => {
  it('should have accessible content', async () => {
    const { findAllByRole, findByRole } = render(<SidebarOptions />);

    // It should have an accessible title
    await findByRole('banner', { name: /options/i });

    const toggles = await findAllByRole('switch');

    toggles.forEach(toggle => {
      fireEvent.click(toggle);
    });
  });
});
