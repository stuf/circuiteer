import { renderHook } from '@testing-library/react-hooks';

import { wrapper } from 'common/testutil';

import { useCanvasObjects } from './objects';

test('useCanvasObjects', () => {
  renderHook(() => useCanvasObjects(), { wrapper });
});
