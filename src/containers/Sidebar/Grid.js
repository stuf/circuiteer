import * as L from 'partial.lenses';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Group, Input } from 'components';
import { setGridSize } from 'state/grid';
import { gridSizeIn } from 'common/selectors';

export function SidebarGrid() {
  const update = useDispatch();
  const { t } = useTranslation();

  const gxy = useSelector(gridSizeIn, shallowEqual);

  const [gw, gh] = gxy;
  return (
    <>
      <Group title={t('common:grid')}>
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="sidebar-grid-width"
            label={t('common:width')}
            type="number"
            value={gw}
            onChange={e => update(setGridSize(L.set(0, +e.target.value, gxy)))}
          />
          <Input
            id="sidebar-grid-height"
            label={t('common:height')}
            type="number"
            value={gh}
            onChange={e => update(setGridSize(L.set(1, +e.target.value, gxy)))}
          />
        </div>
      </Group>
    </>
  );
}

export default SidebarGrid;
