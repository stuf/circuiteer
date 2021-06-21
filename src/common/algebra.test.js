import { Point } from './algebra';

describe('Point', () => {
  test('associativity (Semigroup)', () => {
    const a = { x: 1, y: 1 };
    const b = { x: 2, y: 2 };
    const c = { x: 3, y: 3 };

    expect(Point.concat(Point.concat(a, b), c)).toEqual(
      Point.concat(a, Point.concat(b, c)),
    );
  });

  test('right identity (Monoid)', () => {
    const a = { x: 1, y: 1 };
    expect(Point.concat(a, Point.empty())).toEqual(a);
  });

  test('left identity (Monoid)', () => {
    const a = { x: 1, y: 1 };

    expect(Point.concat(Point.empty(), a)).toEqual(a);
  });

  test('identity (Functor)', () => {
    const a = { x: 1, y: 1 };
    const f = x => x;

    expect(Point.map(f, a)).toEqual(a);
  });

  test('composition (Functor)', () => {
    const a = { x: 12, y: -12 };
    const f = x => ({ x: x.x * -2, y: x.y * -2 });
    const g = x => ({ x: x.x * x.x, y: x.y * x.y });

    expect(Point.map(x => f(g(x)), a)).toEqual(Point.map(f, Point.map(g, a)));
  });
});
