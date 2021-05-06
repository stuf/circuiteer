import * as L from 'partial.lenses';

const { round } = Math;

export const gridI = ([gw, gh]) =>
  L.iso(
    ([x, y]) => [round(x / gw), round(y / gh)],
    ([x, y]) => [x * gw, y * gh],
  );
