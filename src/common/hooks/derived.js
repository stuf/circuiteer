import * as L from 'partial.lenses';
import { useMemo } from 'react';

import { useCanvasObjects } from './objects';
import { useGameEntities } from './game-entities';
import { DefaultSize } from 'common/defaults';
// import { useGameLocations } from './locations';

import { getLogger } from 'common/logger';

const logger = getLogger('hooks/derived');

/**
 * Hook for selecting the currently placed objects on the canvas
 * with all their 'references' populated with the appropriate
 * values.
 *
 * E.g. placed objects will contain the game object they represent
 * instead of a simple ID.
 *
 * @param {Hooks.Derived.UseCanvasGameObjectsOptions} options
 * @returns {Hooks.Derived.UseCanvasGameObjectsHook}
 */
export function useCanvasGameObjects(options) {
  const objects = useCanvasObjects();
  const gameEntities = useGameEntities();

  const objectsʼ = useMemo(
    () =>
      L.transform(
        [
          'entities',
          L.values,
          L.seq(
            ['entity', L.modifyOp(id => gameEntities.entities[id])],
            L.modifyOp(
              /**
               *
               * @param {Data.PopulatedCanvasObject} o
               */
              o => {
                if (!options?.useEntitySize) return o;

                if (!o.entity?.tier) {
                  logger.log(
                    'info',
                    'object `%s` (of type `%s`) does not have entity populated',
                    o.id,
                    o.entity?.id,
                  );
                  return o;
                }

                const size = DefaultSize[o.entity.tier];

                if (!size) {
                  logger.log(
                    'info',
                    'object `%s` does not have a default size defined',
                    o.id,
                  );

                  return o;
                }

                return L.set('size', size, o);
              },
            ),
          ),
        ],
        objects,
      ),
    [objects, options, gameEntities],
  );

  return objectsʼ;
}

/**
 *
 * @returns {Hooks.Derived.UsePowerEfficiencyHook}
 */
export function usePowerEfficiency() {
  // const location = useGameLocations();
  const objects = useCanvasGameObjects();

  const power = { producers: {}, consumers: {} };
  for (let i = 0, len = objects.ids.length; i < len; i++) {
    const id = objects.ids[i];
    const o = objects.entities[id];
    if (!(o && o.entity)) {
      break;
    }

    if (o.entity.power >= 0) {
      power.producers[id] = o;
    } else {
      power.consumers[id] = o;
    }
  }

  const sum = {
    producers: L.sum(['producers', L.values, 'entity', 'power'], power),
    consumers: L.sum(['consumers', L.values, 'entity', 'power'], power),
  };

  return { power, sum };
}
