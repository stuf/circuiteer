import { useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as L from 'partial.lenses';
import * as R from 'ramda';

import { Group, Icon } from 'components';
import { changeLocation } from 'state/location';

export default function Location() {
  const update = useDispatch();
  const { t } = useTranslation();

  const locations = useSelector(L.get(['location', 'locations']), shallowEqual);
  const currentId = useSelector(L.get(['location', 'current']));
  const current = useMemo(() => locations.find(R.whereEq({ id: currentId })), [
    locations,
    currentId,
  ]);

  return (
    <Group title={t('common:location')}>
      <div className="relative shadow-md rounded-md border-2 hover:shadow-lg bg-white">
        <span className="absolute inset-y-0 right-2 inline-flex items-center">
          <Icon name="unfold_more" />
        </span>

        <select
          className="px-4 py-2 appearance-none block w-full bg-transparent"
          value={current.id}
          onChange={e => update(changeLocation(e.target.value))}
        >
          {locations.map((loc, i) => {
            return (
              <option key={i} className="px-4 py-2" value={loc.id}>
                {t(`game:location.${loc.id}`)}
              </option>
            );
          })}
        </select>
      </div>
    </Group>
  );
}
