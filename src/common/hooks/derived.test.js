import { renderHook } from '@testing-library/react-hooks';

import { wrapper } from 'common/testutil';

import { useCanvasGameObjects } from './derived';

test('useCanvasGameObjects', () => {
  const res = renderHook(() => useCanvasGameObjects(), { wrapper });
  console.log(res.result.current);
});
