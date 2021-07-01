import { Size as S } from './algebra';

export const BaseSize = {
  width: 80,
  height: 80,
};

export const SizeScale = {
  1: 1.25,
  2: 2,
  3: 4,
  4: 8,
  '-1': 1,
};

export const DefaultSize = {
  1: S.mul.concat(BaseSize, S.mul.of(SizeScale[1])),
  2: S.mul.concat(BaseSize, S.mul.of(SizeScale[2])),
  3: S.mul.concat(BaseSize, S.mul.of(SizeScale[3])),
  4: S.mul.concat(BaseSize, S.mul.of(SizeScale[4])),
  '-1': S.mul.concat(BaseSize, S.mul.of(SizeScale[-1])),
};
