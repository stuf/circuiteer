import * as L from 'partial.lenses';
import { useSelector, shallowEqual } from 'react-redux';

import Group from '_/Group';
import Dropdown from '_/Dropdown';

export default function Location(props) {
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

  const current = locations.find(x => x.value === currentLocation);

  return (
    <Group title="Location">
      <Dropdown
        value={current}
        choices={locations}
        onChange={e => {
          console.log('change', e);
        }}
      />
    </Group>
  );
}
