import { render } from '@testing-library/react';

import { Ghost } from './Ghost';

test('Ghost', () => {
  const props = {
    size: { width: 100, height: 100 },
    pos: { x: 1, y: 2 },
    id: '123',
  };
  const res = render(<Ghost {...props} />);
});
