import { fireEvent } from '@testing-library/react';

import { render } from 'test-utils';
import SidebarGrid from '../Grid';

describe('SidebarGrid', () => {
  it('works by default', async () => {
    const { findByRole } = render(<SidebarGrid />);

    const w = await findByRole('spinbutton', { name: /common:width/i });
    const h = await findByRole('spinbutton', { name: /common:height/i });

    fireEvent.change(w, { target: { value: 123 } });
    fireEvent.change(h, { target: { value: 234 } });
  });
});
