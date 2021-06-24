export const Point = {
  // Semigroup
  concat: (a, b) => ({ x: a.x + b.x, y: a.y + b.y }),

  // Monoid
  empty: () => ({ x: 0, y: 0 }),

  // Functor
  map: (f, a) => f(a),
};

export const Size = {};

Size.Multiply = {
  concat: (a, b) => ({ width: a.width * b.width, height: a.height * b.height }),

  empty: () => ({ width: 1, height: 1 }),

  map: (f, a) => f(a),

  of: a => ({ width: a, height: a }),
};

Size.mul = Size.Multiply;
