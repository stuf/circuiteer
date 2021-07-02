import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setObjects } from 'state/objects';
import { setGameObjects } from 'state/game-entities';
import { setLocations } from 'state/location';
import { setFlags } from 'state/options';
import { setTiers } from 'state/tier';

import objects from 'dev/objects';
import { objects as gameObjects } from 'dev/game-entities';
import locationObjects from 'dev/location';
import { flags } from 'dev/options';
import tiers from 'dev/tier';

/**
 * @todo As alternative, just initialize the store with a specific state
 */
export function useApplicationBootstrap() {
  const update = useDispatch();

  useEffect(() => {
    update(setObjects(objects));
    update(setGameObjects(gameObjects));
    update(setLocations(locationObjects));
    update(setFlags(flags));
    update(setTiers(tiers));
  }, [update]);
}
