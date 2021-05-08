import * as R from 'ramda';
import * as L from 'partial.lenses';
import { useEffect, useRef } from 'react';

// #region useHotkey

/**
 * Key synonyms
 */
const syn = {
  control: 'ctrl',
  meta: 'meta',
  alt: 'alt',
  opt: 'opt',
  cmd: 'meta',
  esc: 'escape',
};

const splitHotkey = L.modifyOp(R.split('+'));
const intoBooleanDict = L.modifyOp(R.reduce((o, k) => L.set(k, false, o), {}));
const synOrId = k => syn[k] ?? k;
const normalizeKey = L.seq(L.modifyOp(R.toLower), L.modifyOp(synOrId));
const normKeys = [L.keys, normalizeKey];

export function useHotkey(hotkey, fn) {
  if (!fn) {
    console.warn('useHotkey: Hotkey `%s` not bound to any callback.', hotkey);
  }

  const hk = L.transform(L.seq(splitHotkey, intoBooleanDict, normKeys), hotkey);

  const _keys = useRef(hk);
  let pk = _keys.current;

  /**
   * @todo Figure out if you need to optimize redundant rerenders right now
   * @param {KeyboardEvent} e
   */
  const keyDownFn = e => {
    let k = e.key.toLowerCase();

    if (syn[k]) k = syn[k];

    if (k in pk && !pk[k]) {
      pk = L.set(k, true, pk);

      const fulfilled = L.and(L.values, pk);
      if (fulfilled && fn) {
        fn(e);
      }
    }
  };

  /**
   * @param {KeyboardEvent} e
   */
  const keyUpFn = e => {
    let k = e.key.toLowerCase();
    if (syn[k]) k = syn[k];

    if (k in pk && pk[k]) {
      pk = L.set(k, false, pk);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDownFn);
    window.addEventListener('keyup', keyUpFn);

    return () => {
      window.removeEventListener('keydown', keyDownFn);
      window.removeEventListener('keyup', keyUpFn);
    };
  });
}

// #endregion
