import * as L from 'partial.lenses';
import { fireEvent, logRoles } from '@testing-library/react';

import { render } from 'test-utils';
import { preloadedState } from 'core/preloaded';
import { Infobar } from '../Infobar';

describe('Infobar', () => {
  it('works by default', async () => {
    const { container, findByRole, findByLabelText } = render(<Infobar />);

    // logRoles(container);

    expect(container).toMatchSnapshot();

    const buttons = [
      await findByLabelText(/power/i),
      await findByRole('button', { name: /import/i }),
      await findByRole('button', { name: /export/i }),
    ];

    buttons.forEach(button => fireEvent.click(button));
  });

  it('allows to show efficiency as word instead of raw value', () => {
    const initialState = L.set(
      ['options', 'flags', 'showEfficiencyAsMultiplier'],
      false,
      preloadedState,
    );
    const { container } = render(<Infobar />, { initialState });

    logRoles(container);
  });
});
