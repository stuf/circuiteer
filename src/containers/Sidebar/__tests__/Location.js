import { logRoles, fireEvent, act } from '@testing-library/react';

import { render } from 'test-utils';
import { SidebarLocation } from '../Location';

describe('SidebarLocation', () => {
  it('works by default', async () => {
    const { container, queryByRole, queryAllByRole } = render(
      <SidebarLocation />,
    );

    expect(queryByRole('banner')).toBeInTheDocument();

    const select = queryByRole('combobox');
    const items = queryAllByRole('option');

    expect(items).not.toBeEmpty();

    const it1 = items[0];
    const it2 = items[items.length - 1];

    act(() => {
      fireEvent.change(select, { target: { value: it1.value } });
    });

    expect(select.value).toBe(it1.value);

    act(() => {
      fireEvent.change(select, { target: { value: it2.value } });
    });

    expect(select.value).toBe(it2.value);
  });
});
