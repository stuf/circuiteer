import * as R from 'ramda';
import * as L from 'partial.lenses';
import { Matrix } from 'common/linear';

const { round } = Math;

const construct1 = R.constructN(1);

export const gridI = ([gw, gh]) =>
  L.iso(
    ([x, y]) => [round(x / gw), round(y / gh)],
    ([x, y]) => [x * gw, y * gh],
  );

export const matrixI = L.iso(
  construct1(Matrix),
  R.pipe(R.prop('data'), R.invoker(0, 'flat')),
);

/**
 * Handle a screen-space point as a grid-space point.
 * Performs rounding, so loss of precision will happen
 * when coordinates are between [0..gridX] and [0..gridY].
 *
 * @param {Point} gxy
 * @param {Function} roundingFn
 * @returns
 */
export const asGridPointI = (gxy, roundingFn = Math.round) => [
  matrixI,
  L.iso(
    R.pipe(R.invoker(1, 'div')(gxy), R.map(roundingFn)),
    R.invoker(1, 'mul')(gxy),
  ),
];
