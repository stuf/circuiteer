import { natural, refined, composite, atmospheric } from '../index';

test('works', () => {
  expect({ natural, refined, composite, atmospheric }).toMatchSnapshot();
});
