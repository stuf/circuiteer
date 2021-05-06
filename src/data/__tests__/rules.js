import * as V from 'partial.lenses.validation';
import { nonEmpty, position, boolean, entities } from '../rules';

describe('Rules', () => {
  test('nonEmpty', () => {
    expect(V.errors(nonEmpty, null)).not.toBeUndefined();
    expect(V.errors(nonEmpty, 123)).toBeUndefined();
  });

  test('position', () => {
    expect(V.errors(position, [])).not.toBeUndefined();
    expect(V.errors(position, [1])).not.toBeUndefined();
    expect(V.errors(position, [1, 2])).toBeUndefined();
  });

  test('boolean', () => {
    expect(V.errors(boolean, 'true')).not.toBeUndefined();
    expect(V.errors(boolean, true)).toBeUndefined();
  });

  describe('entities', () => {
    test('baseEntity', () => {
      const { baseEntity } = entities;

      const invalids = [
        {},
        { id: 123, pos: [] },
        { id: 123, pos: [1] },
        { id: 123, pos: [1, 2] },
        { id: 123, pos: [1, 2], enabled: true },
        { id: '123', pos: [1, 2], enabled: true, module: 123 },
      ];

      const valids = [
        { id: '123', pos: [1, 2], enabled: true, module: 'dummy' },
        { pos: [1, 2], enabled: true, module: 'dummy' },
      ];

      invalids.forEach(o => {
        expect(V.errors(baseEntity, o)).not.toBeUndefined();
      });

      valids.forEach(o => {
        expect(V.errors(baseEntity, o)).toBeUndefined();
      });
    });
  });
});
