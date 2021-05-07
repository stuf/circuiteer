import { useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { SelectorIcon } from '@heroicons/react/solid';
import * as L from 'partial.lenses';

import Group from '_/Group';
import { changeLocation } from 'state/location';

export default function Location() {
  const update = useDispatch();

  const { currentLocation, locations } = useSelector(
    L.get([
      'location',
      L.valueOr({}),
      L.pick({
        currentLocation: 'current',
        locations: [
          'locations',
          L.array(
            L.pick({
              value: 'id',
              label: 'displayName',
            }),
          ),
        ],
      }),
    ]),
    shallowEqual,
  );

  const current = useMemo(() => {
    return locations.find(x => x.value === currentLocation);
  }, [locations, currentLocation]);

  return (
    <Group title="Location">
      <div className="relative shadow-md rounded-md border-2 hover:shadow-lg bg-white">
        <span className="absolute inset-y-0 right-2 inline-flex items-center">
          <SelectorIcon className="w-5 h-5" />
        </span>
        <select
          className="px-4 py-2 appearance-none block w-full bg-transparent"
          value={current.value}
          onChange={e => update(changeLocation(+e.target.value))}
        >
          {locations.map((loc, i) => {
            return (
              <option key={i} className="px-4 py-2" value={loc.value}>
                {loc.label}
              </option>
            );
          })}
        </select>
      </div>
    </Group>
  );
}
