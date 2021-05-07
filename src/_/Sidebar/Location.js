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
        value={current.value}
        onChange={e => {
          console.log(e.target.value);
          update(changeLocation(+e.target.value));
        }}
      >
        {locations.map((loc, i) => {
          return (
            <option key={i} value={loc.value}>
              {loc.label}
            </option>
          );
        })}
      </select>
      {/* <Dropdown
        value={current}
        choices={locations}
        onChange={e => {
          console.log('change', e);
          update(changeLocation(e.value));
        }}
      /> */}
    </Group>
  );
}
