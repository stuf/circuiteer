import { MaterialType, BaseMaterial } from '../material';

it('works as a data constructor', () => {
  const a1 = new BaseMaterial({
    id: 'dummy',
    name: 'Dummy',
    type: MaterialType.NATURAL,
  });

  expect(a1).toBeInstanceOf(BaseMaterial);

  const o1 = JSON.parse(JSON.stringify(a1));

  expect(o1).toEqual({
    id: 'dummy',
    name: 'Dummy',
    type: MaterialType.NATURAL,
  });
});
