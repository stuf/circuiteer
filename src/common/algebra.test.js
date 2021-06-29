/* eslint-disable jest/valid-title */
import { Point, Size } from './algebra';

const name = {
  semigroup: 'Semigroup',
  semigroupoid: 'Semigroupoid',
  monoid: 'Monoid',
  functor: 'Functor',
  applicative: 'Applicative',
  apply: 'Apply',
  alt: 'Alt',
  plus: 'Plus',
};

const law = {
  assoc: 'Associativity',
  compose: 'Composition',
  distributivity: 'Distributivity',
  idLeft: 'Left identity',
  idRight: 'Right identity',
  id: 'Identity',
  homomorphism: 'Homomorphism',
  interchange: 'Interchange',
  annihilation: 'Annihilation',
};

const label = {
  semi: {
    assoc:
      'Semigroup: associativity; S.concat(S.concat(a, b), c) ≡ S.concat(a, S.concat(b, c))',
  },
  monoid: {
    idLeft: '',
    idRight: '',
  },
  functor: {
    id: '',
    compose: '',
  },
  apply: {
    compose: '',
  },
  applicative: {
    id: '',
    homomorphism: '',
    interchange: '',
  },
  alt: {
    assoc: '',
    distributivity: '',
  },
  plus: {
    idRight: 'P.alt(a, P.zero()) ≡ a',
    idLeft: 'P.alt(P.zero(), a) ≡ a',
    annihilation: 'P.map(f, P.zero()) ≡ P.zero()',
  },
  semigroupAssoc:
    'Semigroup: associativity; S.concat(S.concat(a, b), c) ≡ S.concat(a, S.concat(b, c))',
  monoidRightId: 'Monoid: right identity; M.concat(a, M.empty()) ≡ a',
  monoidLeftId: 'Monoid: left identity; M.concat(M.empty(), a) ≡ a',
  functorId: 'Functor: identity; F.map(x => x, a) ≡ a',
  functorComp:
    'Functor: composition; F.map(x => f(g(x)), a) ≡ F.map(f, F.map(g, a))',
  applyComp:
    'A.ap(A.ap(A.map(f => g => x => f(g(x)), a), u), v) ≡ A.ap(a, A.ap(u, v))',
  apId: 'Applicative: identity; A.ap(A.of(x => x), v) ≡ v',
  apHomomorphism:
    'Applicative: homomorphism; A.ap(A.of(f), A.of(x)) ≡ A.of(f(x))',
  apInterchange:
    'Applicative: interchange; A.ap(u, A.of(y)) ≡ A.ap(A.of(f => f(y)), u)',
};

describe('Point', () => {
  describe('Add', () => {
    let P;

    beforeEach(() => {
      P = Point.add;
    });

    test(label.semigroupAssoc, () => {
      const a = { x: 1, y: 1 };
      const b = { x: 2, y: 2 };
      const c = { x: 3, y: 3 };

      expect(P.concat(P.concat(a, b), c)).toEqual(P.concat(a, P.concat(b, c)));
    });

    test(label.monoidRightId, () => {
      const a = { x: 1, y: 1 };
      expect(P.concat(a, P.empty())).toEqual(a);
    });

    test(label.monoidLeftId, () => {
      const a = { x: 1, y: 1 };

      expect(P.concat(P.empty(), a)).toEqual(a);
    });

    test(label.functorId, () => {
      const a = { x: 1, y: 1 };
      const f = x => x;

      expect(P.map(f, a)).toEqual(a);
    });

    test(label.functorComp, () => {
      const a = { x: 12, y: -12 };
      const f = x => ({ x: x.x * -2, y: x.y * -2 });
      const g = x => ({ x: x.x * x.x, y: x.y * x.y });

      expect(P.map(x => f(g(x)), a)).toEqual(P.map(f, P.map(g, a)));
    });
  });
});

describe('Size', () => {
  describe('Multiply', () => {
    test(label.semigroupAssoc, () => {
      const a1 = { width: 1, height: 1 };
      const a2 = { width: 4, height: 4 };

      const M = Size.Multiply;

      expect(M.concat(a1, a2)).toEqual(a2);

      const b1 = { width: 4, height: 4 };

      expect(M.concat(b1, b1)).toEqual({ width: 16, height: 16 });
    });

    test(label.monoidRightId, () => {
      const M = Size.Multiply;
      const p = { width: 16, height: 16 };

      expect(M.concat(p, M.empty())).toEqual(p);
    });

    test(label.monoidLeftId, () => {
      const M = Size.Multiply;
      const p = { width: 16, height: 16 };

      expect(M.concat(M.empty(), p)).toEqual(p);
    });

    test(label.functorId, () => {
      const M = Size.Multiply;
      const f = a => a;

      expect(M.map(f, M.empty())).toEqual(M.empty());
    });

    test(label.functorComp, () => {
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
