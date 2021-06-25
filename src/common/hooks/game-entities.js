import { normalize } from 'common/util';
import * as L from 'partial.lenses';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 *
 * @returns {Hooks.GameEntities.UseGameEntitiesHook}
 */
export function useGameEntities() {
  const entities = useSelector(L.get(['gameEntities', 'entities']));

  const normalized = useMemo(() => normalize(entities), [entities]);
  console.log('normalized', normalized);

  return normalized;
}
