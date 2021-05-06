import { isNonEmpty, isArray, isPosition, isBoolean } from '../validation';

describe('Validation', () => {
  test('isNonEmpty', () => {
    expect(isNonEmpty(123)).toBe(true);
    expect(isNonEmpty()).toBe(false);
  });

  test('isArray', () => {
    expect(isArray([])).toBe(true);
    expect(isArray(123)).toBe(false);
  });

  test('isPosition', () => {
    expect(isPosition([])).toBe(false);
    expect(isPosition([1])).toBe(false);
    expect(isPosition([1, 2])).toBe(true);
  });

  test('isBoolean', () => {
    expect(isBoolean('true')).toBe(false);
    expect(isBoolean(true)).toBe(true);
  });
});
