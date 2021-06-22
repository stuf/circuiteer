import * as L from 'partial.lenses';
import * as I from 'infestines';
import * as RTK from '@reduxjs/toolkit';

export const createPrefixedActionCreator = prefix => (type, prepareFn) => {
  const prefixedType = [prefix, type].join('/');

  return RTK.createAction(prefixedType, prepareFn);
};

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
