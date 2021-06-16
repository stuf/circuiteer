import * as L from 'partial.lenses';
import { renderHook } from '@testing-library/react-hooks';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { preloadedState } from 'core/preloaded';
import * as reducer from 'state';
import { useCurrentEntity } from '../hooks';

describe('useCurrentEntity', () => {
  test('returns an object for manipulating the currently selected entity', () => {
    const fst = L.get(['editor', 'entities', L.first], preloadedState);

    const store = configureStore({
      preloadedState: L.set(['editor', 'current'], fst.id, preloadedState),
      reducer,
    });

    function Wrapper(props) {
      return <Provider store={store}>{props.children}</Provider>;
    }

    const res = renderHook(() => useCurrentEntity(), { wrapper: Wrapper });
  });

  test("does't throw in case if calling while not having a selected entity", () => {
    const store = configureStore({
      preloadedState,
      reducer,
    });

    function Wrapper(props) {
      return <Provider store={store}>{props.children}</Provider>;
    }

    const res = renderHook(() => useCurrentEntity(), { wrapper: Wrapper });
  });
});
