import { lookup } from './lookup';

/**
 *
 * @param {string[]} modules - list of module ids to collect from
 */
export const shoppingList = modules => {
  const collected = {};

  for (const module of modules) {
    const mod = lookup.module[module];
    const recipe =
      mod?.recipe ||
      (() =>
        console.warn(
          'module %s does not have a recipe associated with it',
          mod?.id || module,
        ) || {})();

    Object.entries(recipe).forEach(([material, count]) => {
      if (!(material in collected)) {
        collected[material] = 0;
      }

      collected[material] = collected[material] + count;
    });
  }

  return collected;
};
