/* eslint-disable */
import * as R from 'ramda';
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useSelector } from 'react-redux';

import { Matrix, Vector } from 'common/linear';
import { useGridSizeMatrix } from 'common/hooks';
import { useDragging } from './hooks/useDragging';

/**
 * @param {import('react').Ref<SVGSVGElement>} ref
 */
export function useCanvasHandlers(ref, deps) {
  const grid = useGridSizeMatrix();

  const x = useDragging(ref, deps);

  return {
    grid,
    getEvents: x.getEvents,
  };
}
