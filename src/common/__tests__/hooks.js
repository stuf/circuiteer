import { renderHook, act } from '@testing-library/react-hooks';
import { createEvent, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import {
  useHotkey,
  useOptions,
  useGridSize,
  useGridSizeMatrix,
} from '../hooks';
import { Matrix } from 'common/linear';
import store from 'store';

const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('common/hooks', () => {
  test('useHotkey', () => {
    const cb = jest.fn();

    renderHook(() => useHotkey('f', cb));

    act(() => {
      // Press the 'f' key
      fireEvent(window, createEvent.keyDown(document, { key: 'f' }));
      // And remember to release it, so that we can later on press it again
      fireEvent(window, createEvent.keyUp(document, { key: 'f' }));
      // Press another unrelated key
      fireEvent(window, createEvent.keyDown(document, { key: 's' }));
    });

    // It should only trigger for the appropriate handlers interested
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).not.toHaveBeenCalledTimes(2);

    expect(cb.mock.calls[0][0].key).toBe('f');

    act(() => {
      // Now, press the 'f' key again, now callback should be called the 2nd time
      fireEvent(window, createEvent.keyDown(document, { key: 'f' }));
    });

    expect(cb).toHaveBeenCalledTimes(2);
  });

  test('useGridSize', () => {
    const res = renderHook(() => useGridSize(), { wrapper });

    expect(Array.isArray(res.result.current)).toBe(true);
    expect(res.result.current).toHaveLength(2);
  });

  test('useGridSizeMatrix', () => {
    const res = renderHook(() => useGridSizeMatrix(), { wrapper });

    expect(res.result.current).toBeInstanceOf(Matrix);
  });

  test('useOptions', () => {
    const res = renderHook(() => useOptions(), { wrapper });

    expect(res).not.toBeUndefined();
  });
});
