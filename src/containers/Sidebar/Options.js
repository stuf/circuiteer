import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  toggleEfficiencyAsMultiplier,
  toggleEntityEditor,
  toggleHideInvalid,
  togglePowerStatus,
  toggleShoppingList,
} from 'state/options';

import { Group, Toggle } from 'components';

const items = [
  {
    label: 'common:option.hideInvalid',
    value: options => options.flags.hideInvalid,
    action: () => toggleHideInvalid(),
  },
  {
    label: 'common:option.showPowerStatus',
    value: options => options.flags.showPowerStatus,
    action: () => togglePowerStatus(),
  },
  {
    label: 'common:option.showEditor',
    value: options => options.flags.showEditor,
    action: () => toggleEntityEditor(),
  },
  {
    label: 'common:option.showShoppingList',
    value: options => options.flags.showShoppingList,
    action: () => toggleShoppingList(),
  },
  {
    label: 'common:option.showEfficiencyAsMultiplier',
    value: options => options.flags.showEfficiencyAsMultiplier,
    action: () => toggleEfficiencyAsMultiplier(),
  },
];

export default function SidebarOptions(props) {
  const options = useSelector(L.get('options'));
  const update = useDispatch();
  const { t } = useTranslation();

  return (
    <Group title="Options">
      {items.map((item, ix) => (
        <Toggle
          key={ix}
          checked={(item.value || (a => a))(options)}
          label={t(item.label)}
          onChange={() => update(item.action())}
        />
      ))}
    </Group>
  );
}
