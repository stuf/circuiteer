import { fireEvent } from '@testing-library/react';

import { render } from 'test-utils';
import { SidebarLocation } from '../Location';

describe('SidebarLocation', () => {
  it('works by default', () => {
    const { container, findByRole } = render(<SidebarLocation />);
  });
});
