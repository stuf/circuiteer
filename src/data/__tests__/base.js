import { BaseEntity, SmallEntity } from '../base';

let arg;

describe('Data', () => {
  beforeEach(() => {
    arg = { pos: [1, 2], enabled: true, module: '' };
  });
  describe('BaseEntity', () => {
    test('works as a data constructor', () => {
      const valids = [() => BaseEntity(arg), () => new BaseEntity(arg)];
      valids.forEach(fn => expect(fn).not.toThrow());
    });

    test('works with instanceOf', () => {
      const valids = [() => BaseEntity(arg), () => new BaseEntity(arg)];
      valids.forEach(fn => {
        expect(fn).not.toThrow();
        expect(fn()).toBeInstanceOf(BaseEntity);
      });
    });

    test('generates an ID if not given one', () => {
      const o1 = BaseEntity(arg);
      const o2 = BaseEntity({ id: '123', ...arg });

      expect(o1._object.id).not.toBeUndefined();
      expect(o2._object.id).toBe('123');
    });

    test('serializes to JSON', () => {
      const o1 = BaseEntity(arg);
      const obj = o1.toJSON();

      expect('_object' in obj).toBe(false);
      expect(obj).toEqual(o1._object);
    });
  });

  describe('SmallEntity', () => {
    test('works as a data constructor', () => {
      const valids = [() => SmallEntity(arg), () => new SmallEntity(arg)];

      valids.forEach(fn => {
        expect(fn).not.toThrow();
      });
    });

    test('is both an instance of BaseEntity and SmallEntity', () => {
      const o1 = SmallEntity(arg);
      expect(o1).toBeInstanceOf(SmallEntity);
      expect(o1).toBeInstanceOf(BaseEntity);
    });

    test.todo('serializes to JSON');

    test.todo('gets proper defaults for Small');
  });
});
