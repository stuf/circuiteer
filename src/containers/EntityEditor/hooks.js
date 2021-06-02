import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEntity, deleteEntity } from 'state/editor';
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

  if (!current?.module) {
    return {
      current: null,
      module: null,
      toggleCurrent: () => {
        throw new Error(
          [
            "Can not toggle a null entity. You shouldn't be seeing this error",
            "unless you're running tests or you are intentionally doing something",
            'strange.',
          ].join(''),
        );
      },
    };
  }

  const module = modules[current.module];

  return {
    current,
    module,
    toggleCurrent: () => update(toggleEntity({ id: _current })),
    deleteCurrent: () => update(deleteEntity({ id: _current })),
  };
}
