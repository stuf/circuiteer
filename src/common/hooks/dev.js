import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setObjects } from 'state/objects';
import { setGameObjects } from 'state/game-entities';
import { setLocations } from 'state/location';
import objects from 'dev/objects';
import { objects as gameObjects } from 'dev/game-entities';
import locationObjects from 'dev/location';

export function useDebugObjects() {
  const update = useDispatch();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    update(setObjects(objects));
    update(setGameObjects(gameObjects));
    update(setLocations(locationObjects));
  }, [update]);
}
