import { bindActionCreators } from 'redux';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';

export function useActions(actions, deps) {
  const update = useDispatch();

  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map(a => bindActionCreators(a, update));
      }

      return bindActionCreators(actions, update);
    },
    deps ? [update, ...deps] : [update], // eslint-disable-line
  );
}

export function useShallowEqualSelector(sel) {
  return useSelector(sel, shallowEqual);
}
