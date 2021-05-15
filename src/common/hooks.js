import * as R from 'ramda';
import * as L from 'partial.lenses';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Matrix } from 'common/linear';

const { abs } = Math;

//

/**
 *
 * @returns {IPopulatedEntity[]}
 */
export function usePopulatedEntities() {
  const entities = useSelector(L.get(['editor', 'entities']));
  const modules = useSelector(L.get(['module', 'modules']));
  const modsʼ = L.transform(
    [L.elems, 'module', L.modifyOp(id => modules[id])],
    entities,
  );

  return modsʼ;
}

/**
 * @typedef {object} PowerStatus
 * @prop {number} absMaxima
 * @prop {object} usage
 * @prop {number} usage.total
 * @prop {number} usage.active
 * @prop {object} production
 * @prop {number} production.total
 * @prop {number} production.active
 *
 */

export function usePowerStatus() {
  const entities = usePopulatedEntities();

  const takeUsage = xs => xs.filter(n => n < 0).reduce(R.add, 0);
  const takeProduction = xs => xs.filter(n => n > 0).reduce(R.add, 0);

  const power = L.collect([L.elems, 'module', 'power'], entities);
  const powerActive = L.collect(
    [L.elems, L.when(x => x.enabled), 'module', 'power'],
    entities,
  );

  const status = {
    usage: [takeUsage(power), takeUsage(powerActive)],
    production: [takeProduction(power), takeProduction(powerActive)],
  };

  const maxima = Object.values(status)
    .map(L.get([0, L.reread(abs)]))
    .reduce((p, v) => Math.max(p, v), 0);

  return {
    ...status,
    extent: [-maxima, maxima],
  };
}

export function useOptions() {
  /**
   * @type {App.State.Options}
   */
  const options = useSelector(L.get('options'));
  return options;
}

export function useGridSize() {
  const gxy = useSelector(L.get(['grid', 'size']));

  return gxy;
}

export function useGridSizeMatrix() {
  const gxy = useGridSize();

  return new Matrix(gxy);
}

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
