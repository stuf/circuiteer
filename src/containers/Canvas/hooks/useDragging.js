/* eslint-disable */
import * as R from 'ramda';
import * as K from 'kefir';
import { combineLatest, fromEvent, Subject } from 'rxjs';
import { mergeMap, scan } from 'rxjs/operators';
import { useCallback } from 'react';

const state = new Subject({});

const evs = state.pipe(scan(R.merge, { isDragging: false, pos: [0, 0] }));

const drag$ = el => fromEvent(el, 'mousedown').pipe(flatMap);

evs.subscribe({
  next(v) {
    console.log('evs', v);
  },
});

// export const api = {
//   setDrag: v => state.next({ isDragging: v }),
//   setPos: pos => state.next({ pos }),
// };

// api.setDrag(true);
// api.setPos([1, 2]);
// api.setPos([2, 3]);
// api.setPos([3, 4]);
// api.setDrag(false);

//

const dragging$ = el => fromEvent(el, 'mousedown').pipe(mergeMap());

/**
 * @param {SVGSVGElement} ref
 * @param {*} deps
 * @returns
 */
export function useDragging(ref, deps) {
  const _el = ref.current;

  console.group('useDragging');
  console.log('ref =>', ref);
  console.log('deps =>', deps);
  console.groupEnd();

  const getEvents = useCallback(() => {
    const ev$ = K.fromEvents(_el, 'mousedown').flatMapLatest(() =>
      K.fromEvents(_el, 'mousemove').takeUntilBy(
        K.fromEvents(_el, 'mouseup').take(1),
      ),
    );

    return ev$;
  }, deps);

  return {
    getEvents,
  };
}
