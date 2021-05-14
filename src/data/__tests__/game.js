import { IconObject, Module, SmallModule } from '../game';

const constructTwice = (C, ...args) => [C(...args), new C(...args)];

describe('data/game', () => {
  describe('IconObject', () => {
    test('works as a data constructor', () => {
      const [a1, a2] = constructTwice(IconObject, 'foo', 'bar', {});

      expect(a1).toEqual(a2);
    });

    test('works with instanceof operator', () => {
      const [a1, a2] = constructTwice(IconObject, 'foo', 'bar', {});

      expect(a1).toBeInstanceOf(IconObject);
      expect(a2).toBeInstanceOf(IconObject);
    });

    it('serializes into a proper JSON representation', () => {
      const a1 = IconObject('foo', 'bar', {});

      expect(a1.toJSON).toBeInstanceOf(Function);

      const o1 = JSON.parse(JSON.stringify(a1));
      const o1_ = a1.toJSON();

      expect(o1).toEqual(o1_);
    });
  });

  describe('Module', () => {
    test('works as a data constructor', () => {
      const [a1, a2] = constructTwice(Module, {});

      expect(a1).toEqual(a2);
    });

    test('works with instanceof operator', () => {
      const [a1, a2] = constructTwice(Module, {});

      expect(a1).toBeInstanceOf(Module);
      expect(a2).toBeInstanceOf(Module);
    });
  });

  describe('SmallModule', () => {
    test('works as a data constructor', () => {
      const [a1, a2] = constructTwice(SmallModule, {});
      expect(a1).toEqual(a2);
    });

    test('works with instanceof operator', () => {
      const [a1, a2] = constructTwice(SmallModule, {});

      expect(a1).toBeInstanceOf(SmallModule);
      expect(a1).toBeInstanceOf(Module);
      expect(a2).toBeInstanceOf(SmallModule);
      expect(a2).toBeInstanceOf(Module);
    });
  });
});
