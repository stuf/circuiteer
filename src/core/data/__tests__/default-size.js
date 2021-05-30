import { DefaultSize } from '../default-size';
import { Tier } from '../tier';

test('DefaultSize', () => {
  expect(Object.keys(DefaultSize)).toHaveLength(Object.keys(Tier).length);

  expect(DefaultSize).toMatchSnapshot();
});
