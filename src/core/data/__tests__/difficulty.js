import { Difficulty } from '../difficulty';

test('Difficulty', () => {
  expect(Object.keys(Difficulty)).toHaveLength(4);

  expect(Difficulty).toMatchSnapshot();
});
