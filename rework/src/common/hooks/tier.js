import * as L from 'partial.lenses';
import { useSelector } from 'react-redux';

export function useCurrentTier() {
  const current = useSelector(L.get(['tier', 'current']));

  return current;
}
