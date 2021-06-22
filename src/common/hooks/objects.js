import * as L from 'partial.lenses';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export function useCanvasObjects() {
  const objects = useSelector(L.get(['objects', 'entities', L.valueOr([])]));

  const ids = L.collect([L.elems, 'id'], objects);
  const entities = L.modify([L.entries], ([k, v]) => [v.id, v], objects);

  return {
    objects,
    ids,
    entities,
  };
}
