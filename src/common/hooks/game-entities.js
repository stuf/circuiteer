import * as L from 'partial.lenses';
import { useSelector } from 'react-redux';

/**
 *
 * @returns {Hooks.GameEntities.UseGameEntitiesHook}
 */
export function useGameEntities() {
  const { ids, entities } = useSelector(
    L.get(['gameEntities', L.props('ids', 'entities')]),
  );

  return { ids, entities };
}
