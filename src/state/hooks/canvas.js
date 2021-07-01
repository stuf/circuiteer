import * as R from 'ramda';
import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';

import { stateL, currentObject } from '../lenses/canvas';
import {
  setCurrentEntity,
  addedNew,
  addingNew,
  clearCurrentEntity,
} from '../canvas';

export function useCurrentCanvasObject() {
  const objects = useSelector(L.get([stateL, currentObject]));

  return objects;
}

export function useCanvasActions() {
  const update = useDispatch();

  const actions = {
    setCurrentEntity: R.compose(update, setCurrentEntity),
    addedNew: R.compose(update, addedNew),
    addingNew: R.compose(update, addingNew),
    clearCurrentEntity: R.compose(update, clearCurrentEntity),
  };

  return actions;
}
