import * as R from 'ramda';
import * as L from 'partial.lenses';
import {
  usePopulatedEntities,
  useCurrentLocationEfficiency,
} from 'common/hooks';

export function useByRole() {
  const entities = usePopulatedEntities();

  return L.transform(
    L.seq(
      [
        L.elems,
        L.modifyOp(entity =>
          L.set(
            'role',
            entity.module.power > 0 ? 'producer' : 'consumer',
            entity,
          ),
        ),
      ],
      L.modifyOp(R.groupBy(R.prop('role'))),
    ),
    entities,
  );
}

export function usePowerWithEfficiency() {
  const eff = useCurrentLocationEfficiency();
  const { producer } = useByRole();

  const groupT = L.modifyOp(R.groupBy(R.path(['module', 'powerType'])));
  const computeModuleEffT = [
    L.props('powerType', 'power'),
    L.modifyOp(o => {
      const m = eff[o.powerType];

      return L.set('power', { raw: o.power, adjusted: o.power * m }, o);
    }),
  ];
  const categoryPowerSumT = [
    L.values,
    L.modifyOp(xs => ({
      entities: xs,
      meta: {
        raw: L.sum([L.elems, 'module', 'power', 'raw'], xs),
        adjusted: L.sum([L.elems, 'module', 'power', 'adjusted'], xs),
      },
    })),
  ];

  const byPowerType = L.transform(
    L.seq(
      groupT,
      [L.values, L.elems, 'module', computeModuleEffT],
      categoryPowerSumT,
    ),
    producer,
  );

  return byPowerType;
}
