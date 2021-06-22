import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setObjects } from 'state/objects';
import objects from 'dev/objects';

export function useDebugObjects() {
  const update = useDispatch();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    update(setObjects(objects));
  }, [update]);
}
