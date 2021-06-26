import * as L from 'partial.lenses';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useCanvasObjects } from './objects';
import { useGameEntities } from './game-entities';
import { DefaultSize } from 'common/defaults';
import { normalize } from 'common/util';
import { canvasObject } from 'common/lens';
// import { useGameLocations } from './locations';

import { getLogger } from 'common/logger';

const logger = getLogger('hooks/derived');

/**
 *
 * @returns {Hooks.Derived.UseNormalizedGameObjectsHook}
 */
export function useNormalizedGameObjects() {
  // logger.log('info', 'use normalized game objects');
  const gameEntities = useGameEntities();

  const entitiesʼ = L.transform(
    [
      'entities',
      L.values,
      L.modifyOp(
        /**
         *
         * @param {Data.GameEntityObject} o
         */
        o => {
          // console.log(o);
          // if (o.size && o.tier) return o;
          const tier = o.tier;
          const size = DefaultSize[tier];
          // console.log(o.id, tier, o.size, DefaultSize, DefaultSize[3]);

          // console.log('o =>', o);
          // console.log('size =>', size);

          return L.set('size', size, o);
        },
      ),
    ],
    gameEntities,
  );

  // console.log({ entitiesʼ });

  return entitiesʼ;
}

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
  const gameEntities = useNormalizedGameObjects();

  logger.info('use canvas game objects (derived)');

  // console.log('useCanvasGameObjects', objects);

  const tfnEntity = useMemo(
    () => ['entity', L.modifyOp(id => gameEntities.entities[id])],
    [gameEntities.entities],
  );

  const objectsʼ = useMemo(
    () => L.transform(['entities', L.values, tfnEntity], objects),
    [objects, tfnEntity],
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

/**
 *
 * @returns {Hooks.Derived.UseUsageThingsHook}
 */
export function useUsageObjectThings() {
  const gameObjs = useNormalizedGameObjects();
  const objs = useSelector(s => normalize(s.objects.entities));

  const norms = L.transform(
    [
      'entities',
      L.values,
      canvasObject,
      'entity',
      L.modifyOp(id => gameObjs.entities[id]),
    ],
    objs,
  );

  return norms;
}
