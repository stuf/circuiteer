import { createNormalizer } from '../normalize';

describe('common/normalize', () => {
  test('creates a normalizer containing getters and convenience methods', () => {
    const fn = createNormalizer();

    const r = fn([{ id: '123' }, { id: '234' }]);
    const { ids, entities } = r.normalized;

    const first = Object.getOwnPropertyDescriptor(r, 'first');
    const last = Object.getOwnPropertyDescriptor(r, 'last');

    expect(first.get).toBeInstanceOf(Function);
    expect(last.get).toBeInstanceOf(Function);
    expect(r.getById).toBeInstanceOf(Function);
    expect(r.getByIds).toBeInstanceOf(Function);

    const fstObj = entities[ids[0]];
    const lstObj = entities[ids[1]];

    expect(r.first).toEqual(fstObj);
    expect(r.last).toEqual(lstObj);
  });

  test('normalizes data with defaults', () => {
    const fn = createNormalizer();

    const r = fn([{ id: '123' }, { id: '234' }, { id: '345' }]);
    const result = r.normalized;
    expect('ids' in result).toBe(true);
    expect('entities' in result).toBe(true);
    result.ids.forEach(x => expect(x in result.entities).toBe(true));

    // Get the first and last ID
    const [fst] = r.normalized.ids;
    const [lst] = [...r.normalized.ids].reverse();

    const obj1 = r.normalized.entities[fst];
    const obj2 = r.normalized.entities[lst];

    expect(r.first).toEqual(obj1);
    expect(r.last).toEqual(obj2);

    expect(r.getById(fst)).toEqual(obj1);
    expect(r.getByIds([fst, lst])).toEqual([obj1, obj2]);
  });

  test('allows to customize normalization', () => {
    const fn = createNormalizer({
      identifierName: 'identifiers',
      identifier: 'uuid',
      entitiesName: 'objects',
    });

    const input = [
      { uuid: '2b2417d1-2e06-4b03-a8c7-3219592e3bf9' },
      { uuid: '18e5be69-a330-4533-8094-6975dad60825' },
      { uuid: '3ed5f2f4-a6e2-4fa4-9d15-e2360c0a721e' },
    ];

    const r = fn(input);
    const result = r.normalized;

    const [fst] = r.normalized.identifiers;
    const [lst] = [...r.normalized.identifiers].reverse();

    expect('identifiers' in result).toBe(true);
    expect('objects' in result).toBe(true);

    const obj1 = result.objects[fst];
    const obj2 = result.objects[lst];

    result.identifiers.forEach(id => expect(id in result.objects).toBe(true));

    expect(r.first).toEqual(obj1);
    expect(r.last).toEqual(obj2);
  });
});
