import * as L from 'partial.lenses';
import { useSelector } from 'react-redux';

/**
 *
 * @returns {Hooks.Objects.UseCanvasObjectsHook}
 */
export function useCanvasObjects() {
  const objects = useSelector(L.get(['objects', 'entities', L.valueOr([])]));

  const ids = L.collect([L.elems, 'id'], objects);
  const entities = L.modify([L.entries], ([k, v]) => [v.id, v], objects);

  return {
    ids,
    entities,
  };
}
