import * as L from 'partial.lenses';
import { useSelector } from 'react-redux';

import { gridSizeL } from '../lenses/app';

export function useAppSettings() {
  const grid = useSelector(L.get(['app', gridSizeL]));

  return {
    grid,
  };
}
