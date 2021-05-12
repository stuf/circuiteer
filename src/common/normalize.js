import * as L from 'partial.lenses';

/**
 * Create a normalized data structure in a similar manner to
 * ReduxJS Toolkit's `createEntityAdapter`.
 *
 * @param {NormalizerOptions} options
 */
export const createNormalizer = options => {
  /**
   * @type {NormalizerOptions}
   */
  const opts = L.get(
    L.pickIn({
      identifier: L.valueOr('id'),
      identifierName: L.valueOr('ids'),
      entitiesName: L.valueOr('entities'),
    }),
    options,
  );

  const normalize = data => {
    const grouped = L.transform(
      [L.entries, L.modifyOp(([_, v]) => [L.get(opts.identifier, v), v])],
      data,
    );

    const ids = L.collect([L.elems, opts.identifier], data);

    const getById = id => L.get(id, grouped);
    const getByIds = ids => ids.map(id => L.get(id, grouped));

    return {
      normalized: {
        [opts.identifierName]: ids,
        [opts.entitiesName]: grouped,
      },
      get first() {
        const id = L.get(L.first, ids);
        return L.get(id, grouped);
      },
      get last() {
        const id = L.get(L.last, ids);
        return L.get(id, grouped);
      },
      getById,
      getByIds,
    };
  };

  return normalize;
};

/**
 * @typedef {object} NormalizerOptions
 * @prop {any} identifier
 * @prop {string} identifierName
 * @prop {string} entitiesName
 */
