import { Material } from '../material';

describe('schema/material', () => {
  describe('Material', () => {
    it('works as a data constructor', () => {
      const c1 = new Material('asd', 'asd', 'foo');

      expect(c1).toBeInstanceOf(Material);
    });
  });
});
