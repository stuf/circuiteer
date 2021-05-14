import * as L from 'partial.lenses';
import { Matrix } from '../linear';
import { asGridPointI, gridI, matrixI } from '../lens';

describe('common/lens', () => {
  test('matrixI', () => {
    const p1 = [1, 2];

    // Get
    const r1 = L.get(matrixI, p1);
    expect(r1).toBeInstanceOf(Matrix);
    expect(r1.data).toEqual([[1, 2]]);

    // Set
    const s1 = L.set(matrixI, r1.mulEach(5), r1);
    expect(s1).not.toBeInstanceOf(Matrix);
    expect(s1).toEqual([5, 10]);
  });

  test('asGridPointI', () => {
    const p1 = [96, 192];
    const gxy = new Matrix([24, 24]);
    const [_px, _py] = p1;
    const [_gx, _gy] = gxy.data.flat();

    const pointI = asGridPointI(gxy);

    const r1 = L.get(pointI, p1);
    expect(r1.data).toEqual([[_px / _gx, _py / _gy]]);

    const a2 = new Matrix([4, 8]);
    const r2 = L.set(pointI, a2, p1);
    expect(r2).toEqual([(_px / _gx) * _gx, (_py / _gy) * _gy]);
  });
});
