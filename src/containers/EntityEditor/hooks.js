import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEntity } from 'state/editor';
import { modules } from 'config';

/**
 * @param {any} state
 * @return {IEntity[]}
 */
export const selectEntities = state => L.get(['editor', 'entities'], state);

/**
 *
 * @param {*} state
 * @returns {(string | undefined)}
 */
export const selectCurrent = state => L.get(['editor', 'current'], state);

export function useCurrentEntity() {
  const update = useDispatch();

  const items = useSelector(selectEntities);
  const _current = useSelector(selectCurrent);
  const current = items.find(x => x.id === _current);
  const module = modules[current.module];

  return {
    current,
    module,
    toggle: () => update(toggleEntity({ id: current })),
  };
}
