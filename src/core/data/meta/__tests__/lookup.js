import { lookup } from '../lookup';

describe('lookup', () => {
  test('module', () => {
    expect(lookup.module).toMatchSnapshot();
  });
});
