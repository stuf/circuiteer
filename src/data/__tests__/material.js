import {
  BaseMaterial,
  NaturalMaterial,
  RefinedMaterial,
  CompositeMaterial,
  AtmosphericMaterial,
} from '../material';

describe('Data.Material', () => {
  describe('BaseMaterial', () => {
    test('works as a data constructor with or without new', () => {
      const a1 = BaseMaterial({});
      const a2 = new BaseMaterial({});
    });

    test('works with instanceof operator', () => {
      const a1 = BaseMaterial({});

      expect(a1).toBeInstanceOf(BaseMaterial);
    });
  });

  describe('NaturalMaterial', () => {
    test('works as a data constructor with or without new', () => {
      const a1 = NaturalMaterial({});
      const a2 = new NaturalMaterial({});
    });

    test('works with instanceof operator', () => {
      const a1 = NaturalMaterial({});

      expect(a1).toBeInstanceOf(NaturalMaterial);
      expect(a1).toBeInstanceOf(BaseMaterial);
    });
  });

  describe('RefinedMaterial', () => {
    test('works as a data constructor with or without new', () => {
      const a1 = RefinedMaterial({});
      const a2 = new RefinedMaterial({});
    });

    test('works with instanceof operator', () => {
      const a1 = RefinedMaterial({});

      expect(a1).toBeInstanceOf(RefinedMaterial);
      expect(a1).toBeInstanceOf(BaseMaterial);
    });
  });

  describe('CompositeMaterial', () => {
    test('works as a data constructor with or without new', () => {
      const a1 = CompositeMaterial({});
      const a2 = new CompositeMaterial({});
    });

    test('works with instanceof operator', () => {
      const a1 = CompositeMaterial({});

      expect(a1).toBeInstanceOf(CompositeMaterial);
      expect(a1).toBeInstanceOf(BaseMaterial);
    });
  });

  describe('AtmosphericMaterial', () => {
    test('works as a data constructor with or without new', () => {
      const a1 = AtmosphericMaterial({});
      const a2 = new AtmosphericMaterial({});
    });

    test('works with instanceof operator', () => {
      const a1 = AtmosphericMaterial({});

      expect(a1).toBeInstanceOf(AtmosphericMaterial);
      expect(a1).toBeInstanceOf(BaseMaterial);
    });
  });
});
