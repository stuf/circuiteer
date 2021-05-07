import * as L from 'partial.lenses';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import Group from '_/Group';
import { Input } from 'components/form';
import { setGridSize } from 'state/grid';
import { gridSizeIn } from 'common/selectors';

export default function Grid() {
  const update = useDispatch();

  const gxy = useSelector(gridSizeIn, shallowEqual);

  const [gw, gh] = gxy;
  return (
    <>
      <Group title="Grid">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Width"
            type="number"
            value={gw}
            onChange={e => update(setGridSize(L.set(0, +e.target.value, gxy)))}
          />
          <Input
            label="Height"
            type="number"
            value={gh}
            onChange={e => update(setGridSize(L.set(1, +e.target.value, gxy)))}
          />
        </div>
      </Group>
    </>
  );
}
