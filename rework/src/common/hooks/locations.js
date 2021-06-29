import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrent } from 'state/location';

/**
 * @return {Hooks.Locations.UseGameLocationsHook}
 */
export function useGameLocations() {
  const update = useDispatch();

  const { current, ids, entities } = useSelector(
    L.get(['locations', L.props('current', 'ids', 'entities')]),
  );

  const actions = {
    setCurrent: id => update(setCurrent(id)),
  };

  return { current, ids, entities, actions };
}

export function useCurrentLocationEfficiency() {
  const { current, entities } = useGameLocations();
  const { solar, wind } = entities[current] || { solar: 0, wind: 0 };

  return { solar, wind };
}
