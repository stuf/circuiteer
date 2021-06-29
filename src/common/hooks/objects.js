import * as L from 'partial.lenses';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { normalize } from 'common/util';

/**
 *
 * @returns {Hooks.Objects.UseCanvasObjectsHook}
 */
export function useCanvasObjects() {
  const objects = useSelector(L.get(['entities', L.valueOr([])]));
  const normalized = useMemo(() => normalize(objects), [objects]);

  return normalized;
}
