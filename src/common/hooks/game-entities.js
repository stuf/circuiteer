import { normalize } from 'common/util';
import * as L from 'partial.lenses';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getLogger } from 'common/logger';

const logger = getLogger('hooks/game-entities');

/**
 *
 * @returns {Hooks.GameEntities.UseGameEntitiesHook}
 */
export function useGameEntities() {
  const entities = useSelector(L.get(['gameEntities', 'entities']));

  const normalized = useMemo(() => {
    logger.log('info', 'renormalize data');

    return normalize(entities);
  }, [entities]);

  return normalized;
}
