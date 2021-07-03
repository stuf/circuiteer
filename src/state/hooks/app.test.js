import { renderHook } from '@testing-library/react-hooks';

import { wrapper } from 'common/testutil';
import { useAppSettings, useGuideLayerToggle } from './app';

test('useAppSettings', () => {
  const { result } = renderHook(useAppSettings, {
    wrapper,
  });

  const v = result.current;

  expect(v).toMatchObject({
    grid: { visible: false },
    guideLayer: { visible: false },
  });
});

test('useGuideLayerToggle', () => {
  const { result } = renderHook(() => useGuideLayerToggle(), {
    wrapper,
  });

  const [v1, fn] = result.current;
  expect(v1).toBe(false);

  fn();
  const [v2] = result.current;
  expect(v2).toBe(true);
});
