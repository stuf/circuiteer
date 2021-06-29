import { curry2 } from 'common/util';

export const Point = {};

Point.Add = {
  concat: curry2((a, b) => ({ x: a.x + b.x, y: a.y + b.y })),
  empty: () => ({ x: 0, y: 0 }),
  map: curry2((f, a) => f(a)),
  of: a => ({ x: a, y: a }),
};

Point.add = Point.Add;

export const Size = {};

Size.Add = {
  concat: curry2((a, b) => ({
    width: a.width + b.width,
    height: a.height + b.height,
  })),

  empty: () => ({ width: 0, height: 0 }),

  map: curry2((f, a) => f(a)),

  of: a => ({ width: a, height: a }),
};

Size.Multiply = {
  concat: curry2((a, b) => ({
    width: a.width * b.width,
    height: a.height * b.height,
  })),

  empty: () => ({ width: 1, height: 1 }),

  map: curry2((f, a) => f(a)),

  of: a => ({ width: a, height: a }),
};

Size.add = Size.Add;

Size.mul = Size.Multiply;
