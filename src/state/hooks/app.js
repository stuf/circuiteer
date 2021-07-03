import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGuideLayer } from 'state/app';

import { StateL, gridSizeL, guideLayerL, visibleL } from '../lenses/app';

/**
 *
 * @returns {State.Hooks.UseAppSettingsHook}
 */
export function useAppSettings() {
  const guideLayer = useSelector(L.get(['app', StateL.guideLayer]));
  const grid = useSelector(L.get(['app', StateL.grid]));

  return {
    grid,
    guideLayer,
  };
}

export function useGuideLayerToggle() {
  const update = useDispatch();
  const visible = useSelector(L.get(['app', StateL.guideLayerVisible]));

  return [visible, () => update(toggleGuideLayer())];
}
