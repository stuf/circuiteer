import * as L from 'partial.lenses';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGuideLayer } from 'state/app';

import { gridSizeL, guideLayerL, visibleL } from '../lenses/app';

/**
 *
 * @returns {State.Hooks.UseAppSettingsHook}
 */
export function useAppSettings() {
  const guideLayer = useSelector(L.get(['app', guideLayerL]));
  const grid = useSelector(L.get(['app', gridSizeL]));

  return {
    grid,
    guideLayer,
  };
}

export function useGuideLayerToggle() {
  const update = useDispatch();
  const visible = useSelector(L.get(['app', guideLayerL, visibleL]));

  return [visible, () => update(toggleGuideLayer())];
}
