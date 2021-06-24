import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';

import { toggleFlag } from 'state/options';

export function useOptionFlags() {
  const update = useDispatch();
  const flags = useSelector(L.get(['options', 'flags']));

  const actions = {
    toggleFlag: flag => {
      console.log('toggleFlag', flag);
      update(toggleFlag(flag));
    },
  };

  return { flags, actions };
}
