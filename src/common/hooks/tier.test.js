import { renderHook } from '@testing-library/react-hooks';

import { wrapper } from 'common/testutil';

import { useCurrentTier } from './tier';

test('useCurrentTier', () => {
  renderHook(() => useCurrentTier(), { wrapper });
});
