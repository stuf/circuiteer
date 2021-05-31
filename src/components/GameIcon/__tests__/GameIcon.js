import { render } from '@testing-library/react';
import { suppressPropTypeWarnings } from 'test-utils';

import { GameIcon } from '../GameIcon';

suppressPropTypeWarnings();

describe('GameIcon', () => {
  it('works with regular icon names', () => {
    render(<GameIcon name="TierSmall" />);
  });

  it('works with icon name synonyms/lookups', () => {
    render(<GameIcon name="sun" />);
  });
});
