export const Point = {
  concat: (a, b) => ({ x: a.x + b.x, y: a.y + b.y }),
  empty: () => ({ x: 0, y: 0 }),
  map: (f, a) => f(a),
};
