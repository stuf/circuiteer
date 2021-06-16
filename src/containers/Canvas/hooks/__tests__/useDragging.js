import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from 'store';
import { preloadedState } from 'core/preloaded';

import { useDragSize, useIsDragging } from '../useDragging';

function Wrapper(props) {
  return <Provider store={store}>{props.children}</Provider>;
}

test('useDragSize', () => {
  const { result } = renderHook(() => useDragSize(), { wrapper: Wrapper });

  expect(result.current).toEqual(preloadedState.drag.size);
});

test('useIsDragging', () => {
  const { result } = renderHook(() => useIsDragging(), { wrapper: Wrapper });

  expect(result.current).toBe(preloadedState.drag.dragging);
});
