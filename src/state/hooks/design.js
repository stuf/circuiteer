import * as R from 'ramda';
import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';

import { stateL, nameL } from '../lenses/design';
import { setName } from '../design';

export function useDesignName() {
  const name = useSelector(L.get([stateL, nameL]));

  return name;
}

export function useDesignActions() {
  const update = useDispatch();

  const actions = {
    setName: R.compose(update, setName),
  };

  return actions;
}
