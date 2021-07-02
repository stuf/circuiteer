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
import { useCurrentLocationEfficiency } from './locations';

const logger = getLogger('hooks/derived');

export function useCurrentTierModules() {
  const currentTier = useSelector(L.get(['tier', 'current']));
  const gameObjects = useNormalizedGameObjects();

  const tierObjects = useMemo(() => {
    const objs = L.collect(
      ['entities', L.values, L.when(o => o.tier === currentTier)],
      gameObjects,
    );
    return objs;
  }, [currentTier, gameObjects]);

  return tierObjects;
}

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

  const objects = useUsageObjectThings();

  const whenPower = fn => ['entities', L.values, 'entity', 'power', L.when(fn)];
  const whenProd = whenPower(n => n >= 0);
  const whenCons = whenPower(n => n < 0);

  const power = {
    producers: L.collect(whenProd, objects),
    consumers: L.collect(whenCons, objects),
  };

  // console.log(power);

  const sum = {
    producers: L.sum(['producers', L.elems], power),
    consumers: L.sum(['consumers', L.elems], power),
  };

  // console.log(sum);

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

/**
 *
 * @returns {Hooks.Derived.UsePowerBreakdownHook}
 */
export function usePowerBreakdown() {
  const objects = useUsageObjectThings();
  const eff = useCurrentLocationEfficiency();

  const entities = L.collect(L.query('entity'), objects);
  // console.log({ entities, eff });

  const totals = {};
  for (let i = 0, len = entities.length; i < len; i++) {
    const entity = entities[i];
    const { power, powerType } = entity;
    const adjustScalar = eff[powerType] ?? 1;
    // console.log('powerType', powerType);

    totals[powerType] = L.transform(
      L.seq(
        ['raw', L.appendOp(power)],
        ['adjusted', L.appendOp(power * adjustScalar)],
      ),
      totals[powerType],
    );
  }

  const totalsʼ = L.transform(
    [L.values, L.values, L.modifyOp(L.sum(L.elems))],
    totals,
  );

  const whenPos = L.when(x => x > 0);
  const whenNeg = L.when(x => x < 0);
  const rawWhenPos = [L.query('raw'), whenPos];
  const rawWhenNeg = [L.query('raw'), whenNeg];
  const adjWhenPos = [L.query('adjusted'), whenPos];
  const adjWhenNeg = [L.query('adjusted'), whenNeg];

  const production = {
    raw: L.sum(rawWhenPos, totalsʼ),
    adjusted: L.sum(adjWhenPos, totalsʼ),
  };

  const usage = {
    raw: L.sum(rawWhenNeg, totalsʼ),
    adjusted: L.sum(adjWhenNeg, totalsʼ),
  };

  // console.log(show({ production, usage }));

  return { sum: { production, usage }, breakdown: totalsʼ };
}
