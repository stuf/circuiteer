import { render } from '@testing-library/react';

import { preloadedState } from 'common/test/state';
import { wrapperContaining } from 'common/testutil';
import { EntityPalette } from './EntityPalette';

test('EntityPalette', () => {
  const res = render(<EntityPalette />, {
    wrapper: wrapperContaining(preloadedState),
  });
});
