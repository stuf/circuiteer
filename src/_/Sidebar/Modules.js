import * as L from 'partial.lenses';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Group from '_/Group';
import Details from '_/Details';

export default function SidebarModules(props) {
  const update = useDispatch();

  const modules = useSelector(
    L.get(['module', 'tier', L.valueOr({})]),
    shallowEqual,
  );

  return (
    <Group title="Modules">
      <Details title="Tier 123" open>
        poopoo
      </Details>
    </Group>
  );
}
