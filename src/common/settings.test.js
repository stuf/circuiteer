import * as Settings from './settings';

test('Pattern', () => {
  expect(Settings.Pattern).not.toBeUndefined();
  expect(Settings.Pattern).toBeInstanceOf(Object);
});
