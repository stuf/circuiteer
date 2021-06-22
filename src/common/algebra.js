export const Point = {
  // Semigroup
  concat: (a, b) => ({ x: a.x + b.x, y: a.y + b.y }),

  // Monoid
  empty: () => ({ x: 0, y: 0 }),

  // Functor
  map: (f, a) => f(a),
};
