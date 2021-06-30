import { render, logDOM, logRoles } from '@testing-library/react';

import { State } from './State';

test('State', () => {
  const state = {
    id: '123',
    x: 1,
    y: 2,
    origin: { x: 1, y: 2 },
    width: 100,
    height: 200,
  };

  const res = render(<State state={state} />);
});
