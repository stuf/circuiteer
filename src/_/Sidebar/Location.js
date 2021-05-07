import * as L from 'partial.lenses';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Group from '_/Group';
import { changeLocation } from 'state/location';
import { useMemo } from 'react';

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
      <select
        className="px-4 py-2 appearance-none block w-full rounded-md bg-white border-2"
        value={current.value}
        onChange={e => {
          console.log(e.target.value);
          update(changeLocation(+e.target.value));
        }}
      >
        {locations.map((loc, i) => {
          return (
            <option key={i} className="px-4 py-2" value={loc.value}>
              {loc.label}
            </option>
          );
        })}
      </select>
    </Group>
  );
}
