import * as L from 'partial.lenses';
import * as I from 'infestines';

//

const setName = process.env.NODE_ENV === 'production' ? a => a : I.defineNameU;

//

export const scalePair = ([p1, p2], [m1, m2]) => [p1 * m1, p2 * m2];

export const multiplyPair = ([a1, a2], [b1, b2]) => [a1 * b1, a2 * b2];

export const multiplyPairScalar = ([p1, p2], m) => [p1 * m, p2 * m];

// Actions

const actionsCollect = L.collect([L.flatten, L.when(I.isFunction)]);

export const actions = function actions(...fnsIn) {
  const fns = actionsCollect(fnsIn);

  switch (fns.length) {
    case 0:
      return undefined;
    case 1:
      return fns[0];
    default:
      return function actions(e) {
        for (let i = 0, len = fns.length; i < len; i++) {
          fns[i](e);
        }
      };
  }
};

const invokeE = name => setName(e => e[name](), name);

export const preventDefault = invokeE('preventDefault');

export const stopPropagation = invokeE('stopPropagation');
