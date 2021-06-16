import { renderHook } from '@testing-library/react-hooks';
import { useEntities } from '../useEntities';
import { wrapper } from 'test-utils';
import { preloadedState } from 'core/preloaded';

test('useEntities', () => {
  const { result } = renderHook(() => useEntities(), { wrapper });

  const { current } = result;
  const { entities, modules, setCurrent } = current;

  expect(Array.isArray(entities)).toBeTrue();
  expect(modules).toBeInstanceOf(Object);
  expect(setCurrent).toBeInstanceOf(Function);
});
