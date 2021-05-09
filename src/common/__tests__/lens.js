import * as L from 'partial.lenses';
import { gridI } from '../lens';

describe('common/lens', () => {
  test('gridI', () => {
    const m = [4, 4];
    const iso = gridI(m);

    const p1 = [16, 16];
    const p2 = [32, 32];

    expect(L.get(iso, p1)).toEqual([4, 4]);
    expect(L.get(iso, p2)).toEqual([8, 8]);
  });
});
