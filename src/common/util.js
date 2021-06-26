import * as R from 'ramda';
import * as L from 'partial.lenses';
import * as I from 'infestines';
import * as RTK from '@reduxjs/toolkit';
import * as U from 'util';

//

const { abs, sqrt, pow, min, max } = Math;

//

export const curry2 = R.curryN(2);

export const curry3 = R.curryN(3);

export const invokeIf = (f, x) => f(x);

export const createPrefixedActionCreator = prefix => (type, prepareFn) => {
  const prefixedType = [prefix, type].join('/');

  return RTK.createAction(prefixedType, prepareFn);
};

export function normalize(items) {
  const ids = L.collect([L.elems, 'id'], items);
  const entities = L.modify(L.entries, ([k, v]) => [v.id, v], items);

  return {
    ids,
    entities,
  };
}

export function denormalize({ ids = [], entities = {} }) {
  const items = [];
  for (let i = 0, len = ids.length; i < len; i++) {
    const id = ids[i];
    items.push(entities[id]);
  }

  return items;
}

//

/**
 * @template T
 * @param {import('react').SyntheticEvent<T>} e
 */
export const persist = e => e.persist();

/**
 *
 * @param {Event} e
 */
export const preventDefault = e => e.preventDefault();

//

export const actionsCollect = L.collect([L.flatten, L.when(I.isFunction)]);

export const actions = (...fnsIn) => {
  const fns = actionsCollect(fnsIn);

  switch (fns.length) {
    case 0:
      return undefined;
    case 1:
      return fns[0];
    default:
      return function actions(e) {
        for (let i = 0, n = fns.length; i < n; i++) {
          fns[i](e);
        }
      };
  }
};

//

export const euclideanDistance = (p1, p2) =>
  sqrt(pow(abs(p1.x - p2.x), 2) + pow(abs(p1.y - p2.y), 2));

export const clamp = (n, a, b) => max(min(n, a), b);

//

export const percent = v => `${v * 100}%`;

//

export const show = x => U.inspect(x, { colors: false, depth: Infinity });
