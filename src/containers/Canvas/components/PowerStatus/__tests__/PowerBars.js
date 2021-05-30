import { render, logRoles, logDOM } from '@testing-library/react';
import { PowerBars } from '../PowerBars';

const props = {
  bars: [
    { label: 'One', raw: 10, adjusted: 90 },
    { label: 'Two', raw: 20, adjusted: 80 },
  ],
  barHeight: 50,
  width: 100,
  height: 100,
};

describe('PowerBars', () => {
  test('default presentation', async () => {
    const { container, findByRole } = render(
      <svg>
        <PowerBars {...props} />
      </svg>,
    );

    await findByRole('graphics-object', { name: /one/i });
    await findByRole('graphics-object', { name: /two/i });
  });

  test('without grid and axis', async () => {
    const { findByRole } = render(
      <svg>
        <PowerBars {...props} showAxis={false} showGrid={false} />
      </svg>,
    );

    await findByRole('graphics-object', { name: /one/i });
    await findByRole('graphics-object', { name: /two/i });
  });
});
