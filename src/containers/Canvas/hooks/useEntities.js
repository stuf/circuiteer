import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';
import { selectEntity } from 'state/editor';

/**
 * @param {any} state
 * @return {IEntity[]}
 */
export const selectEntities = state => L.get(['editor', 'entities'], state);

export function useEntities() {
  const update = useDispatch();

  /**
   * @type {IEntity[]}
   */
  const items = useSelector(selectEntities);
  const current = useSelector(L.get(['editor', 'current']));

  return {
    entities: items,
    current: items.find(x => x.id === current),
    setCurrent: id => update(selectEntity(id)),
  };
}
