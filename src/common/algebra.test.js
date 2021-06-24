import { Point, Size } from './algebra';

describe('Point', () => {
  test('Semigroup: associativity; S.concat(S.concat(a, b), c) ≡ S.concat(a, S.concat(b, c))', () => {
    const a = { x: 1, y: 1 };
    const b = { x: 2, y: 2 };
    const c = { x: 3, y: 3 };

    expect(Point.concat(Point.concat(a, b), c)).toEqual(
      Point.concat(a, Point.concat(b, c)),
    );
  });

  test('Monoid: right identity; M.concat(a, M.empty()) ≡ a', () => {
    const a = { x: 1, y: 1 };
    expect(Point.concat(a, Point.empty())).toEqual(a);
  });

  test('Monoid: left identity; M.concat(M.empty(), a) ≡ a', () => {
    const a = { x: 1, y: 1 };

    expect(Point.concat(Point.empty(), a)).toEqual(a);
  });

  test('Functor: identity; F.map(x => x, a) ≡ a', () => {
    const a = { x: 1, y: 1 };
    const f = x => x;

    expect(Point.map(f, a)).toEqual(a);
  });

  test('Functor: composition; F.map(x => f(g(x)), a) ≡ F.map(f, F.map(g, a))', () => {
    const a = { x: 12, y: -12 };
    const f = x => ({ x: x.x * -2, y: x.y * -2 });
    const g = x => ({ x: x.x * x.x, y: x.y * x.y });

    expect(Point.map(x => f(g(x)), a)).toEqual(Point.map(f, Point.map(g, a)));
  });
});

describe('Size', () => {
  describe('Multiply', () => {
    test('Semigroup: associativity', () => {
      const a1 = { width: 1, height: 1 };
      const a2 = { width: 4, height: 4 };

      const M = Size.Multiply;

      expect(M.concat(a1, a2)).toEqual(a2);

      const b1 = { width: 4, height: 4 };

      expect(M.concat(b1, b1)).toEqual({ width: 16, height: 16 });
    });

    test('Monoid: right identity', () => {
      const M = Size.Multiply;
      const p = { width: 16, height: 16 };

      expect(M.concat(p, M.empty())).toEqual(p);
    });

    test('Monoid: left identity', () => {
      const M = Size.Multiply;
      const p = { width: 16, height: 16 };

      expect(M.concat(M.empty(), p)).toEqual(p);
    });

    test('Functor: identity', () => {
      const M = Size.Multiply;
      const f = a => a;

      expect(M.map(f, M.empty())).toEqual(M.empty());
    });

    test('Functor: composition', () => {
      const M = Size.Multiply;
      const f = a => ({ width: a.width * -2, height: a.height * -2 });
      const g = a => ({
        width: a.width * a.width,
        height: a.height * a.height,
      });

      const l = M.map(x => f(g(x)), M.empty());
      const r = M.map(f, M.map(g, M.empty()));
      expect(l).toEqual(r);
    });
  });
});
