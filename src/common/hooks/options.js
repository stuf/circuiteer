import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';

import { toggleFlag } from 'state/options';

export function useOptionFlags() {
  const update = useDispatch();
  const flags = useSelector(L.get(['options', 'flags']));

  const actions = {
    toggleFlag: flag => {
      update(toggleFlag(flag));
    },
    toggleFlagThunk: flag => () => update(toggleFlag(flag)),
  };

  return { flags, actions };
}

export function useOptions() {
  const update = useDispatch();
  const flags = useSelector(L.get(['options', 'flags']));

  const toggle = name =>
    function toggle$() {
      update(toggleFlag(name));
    };

  return [flags, toggle];
}
