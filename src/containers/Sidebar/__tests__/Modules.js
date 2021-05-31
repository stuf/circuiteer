import { logRoles, createEvent, act, fireEvent } from '@testing-library/react';
import { render } from 'test-utils';
import { SidebarModules } from '../Modules';

describe('SidebarModules', () => {
  it('works by default', () => {
    render(<SidebarModules />);
  });

  it('filters list of items', async () => {
    const { container, findByRole } = render(<SidebarModules />);

    // logRoles(container);

    const search = await findByRole('searchbox', { name: 'common:search' });

    act(() => {
      fireEvent.change(search, { target: { value: 'ge' } });
    });

    act(() => {
      fireEvent.change(search, { target: { value: 'gen' } });
    });

    const el = await findByRole('listitem', { name: /smallgenerator/i });

    act(() => {
      fireEvent.dragStart(el, { dataTransfer: new DataTransfer() });
    });
  });
});
